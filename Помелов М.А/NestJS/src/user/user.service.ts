import { Injectable } from '@nestjs/common';
import { User } from './user';

@Injectable()
export class UserService {
    private readonly users: User[] = [
        new User('Mir', 25, 'qwerty'),
        new User('Denis', 25, 'qwerty'),
    ]

    public async getAllUsers(): Promise<User[]> {
        return this.users;
    }
}
