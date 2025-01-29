import { Injectable, NotFoundException } from '@nestjs/common';
import UserDto from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import UserRole from './shared/userRole.enum';
import { faker } from "@faker-js/faker";
import { error, info } from 'src/logging/logger';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {} 

  public async findALL(): Promise<User[]> {
    try {
      info('Пользователи найдены!');
      return await this.userRepository.find();
    }
    catch (e) {
      error('Ошибка выборки всех пользователей из БД!', { error: e.message});
      throw new NotFoundException(e.message);
    }
    
  }

  public async create(data: UserDto): Promise<User> {
    try {
      const user: User = this.userRepository.create(data);
      info('Пользователь создан!');
      return await this.userRepository.save(user);
    }
    catch (e) {
      error('Ошибка создания пользователя!', { error: e.message});
      throw new NotFoundException(e.message);
    }
    
  }

  public async getOneById(id: number): Promise<User> {
    try {
      info(`Пользователь по id:${id} найден!`);
      return await this.userRepository.findOneBy({id: id});
    } catch (e) {
      error(`Ошибка поиска пользователя по id:${id}!`, { error: e.message});
      throw new NotFoundException(e.message);
    }
  }

  public async getRoleById(id: number): Promise<UserRole> {
    try {
      const user: User = await this.userRepository.findOneBy({id: id});
      info(`Роль пользователя по id:${id} найдена!`);
      return user.role;
    } catch (e) {
      error(`Ошибка поиска роли пользователя по id:${id}!`, { error: e.message});
      throw new NotFoundException(e.message);
    }
  }

  public async updateUser(id: number, userData: UserDto): Promise<User> {
    try {
      let user: User = await this.userRepository.findOneBy({id: id});
      user = { ...user, ...userData };
      info(`Пользователя по id:${id} обновлен!`);
      return await this.userRepository.save(user);
    } 
    catch (e) {
      error(`Ошибка обновления данных пользователя по id:${id}!`, { error: e.message});
      throw new NotFoundException(e.message);
    }   
  }

  public async fillDbWithFaker(number: number): Promise<User[]> { 
    try {
      for (let i = 0; i < number; i++) {
        const user: User = new User();
        
        user.username = faker.internet.username();       
        
        user.email = faker.internet.email();  
        
        user.password = faker.internet.password();   
        
        user.firstName = faker.person.firstName();  
        
        user.lastName = faker.person.lastName();   
        
        user.phoneNumber = faker.phone.number();   
        
        user.address = faker.location.streetAddress();  
        
        user.city = faker.location.city();  
        
        user.state = faker.location.state();   
        
        user.zipCode = faker.location.zipCode();  
        
        user.country = faker.location.country();  
        
        user.createdAt = new Date();  
        
        user.updatedAt = new Date();  
        
        if (i % 2 == 0) {
          user.role = 0;
        } 
        else {
          user.role = 2;      } 
        
        const newUser: User = this.userRepository.create(user);
        await this.userRepository.save(newUser);
      }
      info(`Создано ${number} пользователя!`);  
      return await this.userRepository.find(); 
    }
    catch (e) {
      error('Ошибка создания пользователей!', { error: e.message});
      throw new NotFoundException(e.message);
    }     
  }
}
