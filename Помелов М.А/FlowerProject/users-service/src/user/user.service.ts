import { Injectable, ConflictException, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser: User = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      this.logger.warn(`Попытка создать пользователя с уже существующим email: ${createUserDto.email}`);
      throw new ConflictException('User with this email already exists!');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password_hash: hashedPassword,
    });

    this.logger.log(`Создан новый пользователь: ${user.email}`);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: { isActive: true },
      order: { registrationDate: 'DESC' }
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, isActive: true }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // if (updateUserDto.email !== undefined) {
    //   throw new BadRequestException('Обновление email запрещено');
    // }
    // Проверка на недопустимые поля
    const allowedFields = [
      'password', 'firstName', 'lastName', 'birthDate', 'city', 'phone', 'personalData'
    ];
    const receivedFields = Object.keys(updateUserDto);
    const extraFields = receivedFields.filter(field => !allowedFields.includes(field));
    if (extraFields.length > 0) {
      throw new BadRequestException(`Недопустимые поля: ${extraFields.join(', ')}`);
    }
    const user = await this.findOne(id);
    const { password, firstName, lastName, city, birthDate, ...rest } = updateUserDto;

    if (password) {
      user.password_hash = await bcrypt.hash(password, 10);
    }

    // Обновляем только разрешенные поля
    const allowedUpdates = { firstName, lastName, city, birthDate };
    Object.entries(allowedUpdates).forEach(([key, value]) => {
      if (value !== undefined) {
        user[key] = key === 'birthDate' ? new Date(value) : value;
      }
    });

    // Логируем попытку изменить запрещенные поля
    if (Object.keys(rest).length > 0) {
      this.logger.warn(`Attempt to update restricted fields for user ${id}:`, Object.keys(rest));
    }

    return this.userRepository.save(user);
  }

  async deactivate(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id, isActive: true } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found or already deactivated`);
    }
    user.isActive = false;
    await this.userRepository.save(user);
    this.logger.log(`Пользователь деактивирован: ${user.email}`);
    return user;
  }

  async activate(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, isActive: false }
    });

    if (!user) {
      throw new NotFoundException(`Deactivated user with ID ${id} not found`);
    }

    user.isActive = true;
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email, isActive: true },
      select: ['id', 'email', 'password_hash', 'isActive']
    });
  }

  async findOneWithFavourites(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, isActive: true },
      relations: ['favouriteProducts']
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
      select: ['id', 'email', 'password_hash', 'isActive', 'firstName', 'lastName', 'birthDate', 'phone', 'city', 'registrationDate', 'lastLogin', 'personalData']
    });
    if (!user) {
      this.logger.warn(`Неудачная попытка входа: пользователь с email ${email} не найден или не активен`);
      throw new NotFoundException(`Неверный логин или пароль!`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      this.logger.warn(`Неудачная попытка входа: неверный пароль для email ${email}`);
      throw new NotFoundException(`Неверный логин или пароль!`);
    }
    this.logger.log(`Пользователь успешно вошёл: ${email}`);
    return user;
  }

  async remove(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.logger.log(`Удален пользователь: ${user.email}`);
    await this.userRepository.remove(user);
    return user;
  }
}