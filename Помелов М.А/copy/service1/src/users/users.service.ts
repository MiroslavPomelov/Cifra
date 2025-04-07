import { BadRequestException, Injectable } from '@nestjs/common';
import UserDto from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  public async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async create(data: User): Promise<User> {
    const user: User = this.userRepository.create(data);

    return this.userRepository.save(user);

  }


  private readonly users: UserDto[] = [
    { name: 'Valery', lastname: 'Ivanov', age: 34, password: 'qwerty' },
    { name: 'Tom', lastname: 'Petrov', age: 20, password: 'fgrtd' },
    { name: 'Sam', lastname: 'Ylichev', age: 41, password: 'ghaswq' },
    { name: 'Ted', lastname: 'Un', age: 29, password: 'ytqbvs' },
  ];

  public getAll(): UserDto[] {
    return this.users;
  }

  public getOneById(id: number): UserDto {
    try {
      return this.users[id];
    } catch (error) {
      throw new BadRequestException('ERROR! NO USER PROVIDED!');
    }
  }

  public createUser(userData: UserDto): UserDto {
    this.users.push(userData);
    return userData;
  }

  public updateUser(id: number, userData: UserDto): UserDto {
    if (id < 0 || id >= this.users.length) {
      throw new BadRequestException('ERROR! NO USERS PROVIDED WITH ID!');
    }
    this.users[id] = { ...this.users[id], ...userData };
    return this.users[id];
  }
}
