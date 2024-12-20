"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../entities/User");
class UserRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    getUserByPasswordAndUsername(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = this.dataSource.getRepository(User_1.User);
            const queryBuilder = userRepo.createQueryBuilder("user");
            const user = yield queryBuilder
                .select()
                .where("username = :username", { username: username })
                .andWhere("password == :password", { password: password })
                .getOne();
            return user;
        });
    }
    getUserByUsername(searchingUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = this.dataSource.getRepository(User_1.User);
            const queryBuilder = userRepo.createQueryBuilder("user");
            const user = yield queryBuilder
                .select()
                .where("username = :username", { username: searchingUsername })
                .getOne();
            return user;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = this.dataSource.getRepository(User_1.User);
            const queryBuilder = userRepo.createQueryBuilder("user");
            const user = yield queryBuilder
                .select()
                .where("id = :id", { id: id })
                .getOne();
            return user;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = this.dataSource.getRepository(User_1.User);
            const queryBuilder = userRepo.createQueryBuilder("user");
            const users = yield queryBuilder.getMany();
            return users;
        });
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = this.dataSource.getRepository(User_1.User);
            console.log('Tut1');
            yield userRepo
                .createQueryBuilder()
                .insert()
                .into(User_1.User)
                .values([
                {
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    age: user.age,
                    password: user.password,
                    order: undefined,
                },
            ])
                .execute();
            console.log('Tut2');
        });
    }
    changeUserData(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = this.dataSource.getRepository(User_1.User);
            const queryBuilder = userRepo.createQueryBuilder("user");
            if (user) {
                yield queryBuilder
                    .update(User_1.User)
                    .set(user)
                    .where('id = :id', { id: user.id })
                    .execute();
            }
        });
    }
}
exports.UserRepository = UserRepository;
