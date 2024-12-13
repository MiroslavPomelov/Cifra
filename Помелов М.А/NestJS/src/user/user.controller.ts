import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('all')
    public async getAllUsers(): Promise<User[]> {
        return await this.userService.getAllUsers();
    }
}
