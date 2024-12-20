import { Injectable } from '@nestjs/common';
import { Task } from 'src/tasks/entities/task';
import { User } from 'src/users/entities/user';

@Injectable()
export class CollectorService {


    private readonly users: User[] = [
        { id: 1, name: 'Bogdan', age: "25" },
        { id: 2, name: 'Mir', age: "25" },
        { id: 3, name: 'Denis', age: "35" }
    ];


    private readonly tasks: Task[] = [
        { id: 1, name: 'First', status: "Complete" },
        { id: 2, name: 'Second', status: "Ready" },
        { id: 3, name: 'Third', status: "Created" }
    ];

    public async getAllUsers(): Promise<User[]> {
        return await this.users;
    }

    public async getAllTsaks(): Promise<Task[]> {
        return await this.tasks;
    }
    
    createUser(incomingUser: User) {
        this.users.push(incomingUser);
    }
}
