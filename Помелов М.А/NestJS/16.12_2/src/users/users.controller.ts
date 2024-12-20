import { Controller, Get, Post } from '@nestjs/common';
import { User } from './entities/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    public async create(): Promise<User[]> {
        return this.usersService.create();
    }

    @Get()
    public async getUser(): Promise<User> {
        
    }
}


