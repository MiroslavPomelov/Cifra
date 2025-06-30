import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import UserDto from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import UserRole from './shared/userRole.enum';
import { faker } from "@faker-js/faker";
import { getCallerInfo, logger } from 'src/logging/logger';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {} 

  public checkingDto(userData: UserDto, user: User): void {
    const userKeys: string[] = Object.keys(user);
      const incomingKeys: string[] = Object.keys(userData);

      incomingKeys.forEach(function (value) {
        if (!userKeys.find((key) => key == value)) {
          logger.info(`Некорректные входные данные!`);
          throw new BadRequestException();
        }
      });
  }

  public async findALL(): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.find();
      if (users) {
        logger.info('Пользователи найдены!');
        return users;
      }
      else {
        throw new NotFoundException();
      }       
    }
    catch (error) {
      logger.error(`${getCallerInfo(error)} Ошибка выборки всех пользователей из БД!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }    
  }

  public async create(data: UserDto): Promise<User> {
    try {
      const user: User = this.userRepository.create(data);

      this.checkingDto(data, user);

      if (user) {
        logger.info('Пользователь создан!');
        return await this.userRepository.save(user);
      }
      else {
        throw new NotFoundException();
      }      
    }
    catch (error) {
      logger.error(`${getCallerInfo(error)} Ошибка создания пользователя!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }    
  }

  public async getOneById(id: number): Promise<User> {
    try { 
      const user: User = await this.userRepository.findOneBy({id: id});
      if (user) {
        logger.info(`Пользователь по id:${id} найден!`);
      return user;
      }
      else {
        logger.info(`Пользователь по id:${id} не найден!`);
        throw new NotFoundException();
      }      
    } catch (error) {
      logger.error(`${getCallerInfo(error)} Ошибка поиска пользователя по id:${id}!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getOneByUsernameAndPassword(username: string, password: string): Promise<User> {
    try { 
      const user: User = await this.userRepository.findOneBy({username: username});
      if (user) {
        if (user.password == password){
          logger.info(`Пользователь по логину:${username} найден, пароль верный!`);
          return user;
        }
        logger.info(`Пользователь по логину:${username} найден, ошибка пароля!`);
        throw new NotFoundException('Неверный пароль');
      }
      else {
        logger.info(`Пользователь по логину:${username} не найден!`);
        throw new NotFoundException();
      }      
    } catch (error) {
      logger.error(`${getCallerInfo(error)} Ошибка поиска пользователя по логину:${username}!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getRoleById(id: number): Promise<UserRole> {
    try {
      const user: User = await this.userRepository.findOneBy({id: id});
      if (user.role || user.role == 0) {
        logger.info(`Роль пользователя по id:${id} найдена!`);
        return user.role;
      } else {
        logger.info(`Роль пользователя по id:${id} не найдена!`);
        throw new NotFoundException();
      }       
    } catch (error) {
      logger.error(`${getCallerInfo(error)} Ошибка поиска роли пользователя по id:${id}!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateUser(id: number, userData: UserDto): Promise<User> {
    try {
      
      let user: User = await this.userRepository.findOneBy({id: id});
        
      this.checkingDto(userData, user);
      
      if (user) {
        user = { ...user, ...userData };
        logger.info(`Пользователя по id:${id} обновлен!`);
        return await this.userRepository.save(user);
      }
      else {
        logger.info(`Пользователь по id:${id} не найден!`);
        throw new NotFoundException();
      }       
    } 
    catch (error) {      
      logger.error(`${getCallerInfo(error)} Ошибка обновления пользователя по id:${id}!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
        else if (i % 3 == 0) {
          user.role = 1;
        }
        else {user.role = 2};
        
        const newUser: User = this.userRepository.create(user);
        await this.userRepository.save(newUser);
      }
      logger.info(`Создано ${number} пользователей!`);  
      return await this.userRepository.find(); 
    }
    catch (error) {
      logger.error(`${getCallerInfo(error)} Ошибка создания пользователей!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }     
  }
}
