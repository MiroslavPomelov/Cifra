"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = require("express-handlebars");
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const mainRoute_1 = __importDefault(require("./routes/mainRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.engine('hbs', (0, express_handlebars_1.engine)({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path_1.default.join(__dirname, '../public/views/layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, '../public/views'));
app.use(mainRoute_1.default);
app.use(authRoutes_1.default);
// Создание БД
// async function creatingBD() {
//    await AppDataSource.initialize();
//    const UsersRepository: Repository<User> = AppDataSource.getRepository(User);
//    const ProductRepository: Repository<Product> = AppDataSource.getRepository(Product);
//    const listOfUsers: User[] = usersCreator();
//    await UsersRepository.save(listOfUsers);
//    await ProductRepository.save(productsCreator());
// }
// creatingBD();
exports.default = app;
