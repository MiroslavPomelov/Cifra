import { Injectable } from '@nestjs/common';
import { User } from './entities/user';
import { CollectorService } from 'src/shared/collector/collector.service';

@Injectable()
export class UsersService {
    constructor(private readonly collector: CollectorService)
    create(): Promise<User[]> {
        this.collector.createUser();
    }
}
