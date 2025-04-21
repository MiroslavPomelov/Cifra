import { IRepo } from "./interfaces/IRepo";
import { User } from "../entities/User";
import { userDataGenerator } from "./functions/generateFunctions";

export class UserRepo implements IRepo<User> {
    listOfUsers: User[] = [];

    constructor() {
        userDataGenerator(50);
    }

    public create(user: User) {
        this.listOfUsers.push(user);
        return this.listOfUsers;
    }

    public read(id: number): User | undefined {

        try {
            const searchUser: User | undefined = this.listOfUsers.find(user => user.id == id);

            return searchUser;

        } catch (error) {

            throw new Error('Reading error!' + error);
        }

    }

    public update(updateData: Partial<User>): void {
        try {

            let updatingUser: User | undefined = this.listOfUsers.find(user => user.id == updateData.id);

            if (!updateData.id) throw new Error('User is not exist!');
            if (!updatingUser) throw new Error('User is not exist!');

            updatingUser = { ...updatingUser, ...updateData };


        } catch (error) {

            throw new Error('Updating user error!' + error);
        }
    }



    public delete(id: number): void {

        try {
            const deleteUser: number = this.listOfUsers.findIndex((user) => user.id == id);

            this.listOfUsers.splice(deleteUser, 1);

        } catch (error) {

            throw new Error('Delete user error!' + error);
        }
    }

}