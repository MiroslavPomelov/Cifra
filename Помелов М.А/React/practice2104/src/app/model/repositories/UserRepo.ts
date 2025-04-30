import { User } from "../entities/User";
import { userDataGenerator } from "./functions/generateFunction";
import { IRepository } from "./interfaces/IRepository";

export class UserRepo implements IRepository<User> {
  listOfUsers: User[] = [];

  constructor() {
    this.listOfUsers = userDataGenerator(50);
  }

  public create(newUser: User): void {
    this.listOfUsers.push(newUser);
  }

  public readOne(id: number): User | undefined {
    try {
      const searchigUser: User | undefined = this.listOfUsers.find(
        (user) => user.id == id
      );
      return searchigUser;
    } catch (error) {
      throw new Error("Error searching user:" + error);
    }
  }

  public readAll(): User[] {
    return this.listOfUsers;
  }

  public update(updateData: Partial<User>): void {
    try {
      const userId: number | undefined = updateData.id;

      if (!userId) throw new Error('User ID is required for updating.');

      const userIndex = this.listOfUsers.findIndex(user => user.id == userId);

      if (!userIndex) {
        throw new Error(`User with ID ${userId} not found`);
      }

    //   this.listOfUsers[userIndex] = {
    //     ...this.listOfUsers[userIndex], 
    //     ...this.listOfUsers[userIndex + 1]
    // };
    } catch (error) {
      throw new Error("Error updating user" + error);
    }
  }
  delete(id: number): void {
    try {
      const indexToDelete: number = this.listOfUsers.findIndex(
        (user) => user.id == id
      );
      if (indexToDelete) {
        this.listOfUsers.splice(indexToDelete, 1);
      }
    } catch (error) {
      throw new Error("Error deleting user" + error);
    }
  }
}
