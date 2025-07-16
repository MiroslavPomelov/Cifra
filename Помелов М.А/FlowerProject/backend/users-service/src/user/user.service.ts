import { Injectable, ConflictException, NotFoundException, Logger, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UserService {
  private readonly SALT_ROUNDS = 10;
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.checkEmailExists(createUserDto.email);
    
    const hashedPassword = await bcrypt.hash(createUserDto.password, this.SALT_ROUNDS);
    const user = this.userRepository.create({
      ...createUserDto,
      password_hash: hashedPassword,
      isActive: createUserDto.isActive !== undefined ? createUserDto.isActive : false,
    });

    this.logger.log(`Создан новый пользователь: ${user.email}`);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    const cacheKey = 'users:all';
    let users = await this.cacheManager.get<User[]>(cacheKey);
    if (users) {
      this.logger.log(`Users list retrieved from Redis: ${cacheKey}`);
      return users;
    }
    users = await this.userRepository.find({
      where: { isActive: true },
      order: { registrationDate: 'DESC' }
    });
    await this.cacheManager.set(cacheKey, users, 60);
    this.logger.log(`Users list cached in Redis: ${cacheKey}`);
    return users;
  }

  async findOne(id: number): Promise<User> {
    // Попробуем получить из кэша
    const cacheKey = `user:${id}`;
    let user = await this.cacheManager.get<User>(cacheKey);
    if (user) {
      this.logger.log(`User retrieved from Redis: ${cacheKey}`);
      return user;
    }
    user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    // Кэшируем результат
    await this.cacheManager.set(cacheKey, user, 60); // ttl в секундах
    this.logger.log(`User cached in Redis: ${cacheKey}`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    this.validateUpdateFields(updateUserDto);
    
    const user = await this.findOne(id);
    const { password, ...updateData } = updateUserDto;

    if (password) {
      user.password_hash = await bcrypt.hash(password, this.SALT_ROUNDS);
    }

    // Обновляем разрешенные поля
    Object.assign(user, this.sanitizeUpdateData(updateData));

    return this.userRepository.save(user);
  }

  async activate(id: number): Promise<User> {
    const user = await this.findInactiveUserById(id);
    if (!user) {
      throw new NotFoundException(`Deactivated user with ID ${id} not found`);
    }

    user.isActive = true;
    return this.userRepository.save(user);
  }

  async deactivate(id: number): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found or already deactivated`);
    }

    user.isActive = false;
    await this.userRepository.save(user);
    
    this.logger.log(`Пользователь деактивирован: ${user.email}`);
    return user;
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

  async findByEmailAndPassword(email: string, password: string): Promise<User> {
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

  async remove(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.logger.log(`Удален пользователь: ${user.email}`);
    await this.userRepository.remove(user);
    return user;
  }

  // Приватные методы для улучшения читаемости
  private async checkEmailExists(email: string): Promise<void> {
    const existingUser = await this.userRepository.findOne({
      where: { email }
    });

    if (existingUser) {
      this.logger.warn(`Trying create user with existing email: ${email}`);
      throw new ConflictException('User with this email already exists!');
    }
  }

  private async findUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id, isActive: true }
    });
  }

  private async findInactiveUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id, isActive: false }
    });
  }

  private validateUpdateFields(updateUserDto: UpdateUserDto): void {
    const allowedFields = [
      'password', 'firstName', 'lastName', 'birthDate', 'city', 'phone', 'personalData'
    ];
    
    const receivedFields = Object.keys(updateUserDto);
    const extraFields = receivedFields.filter(field => !allowedFields.includes(field));

    if (extraFields.length > 0) {
      throw new BadRequestException(`Недопустимые поля: ${extraFields.join(', ')}`);
    }
  }

  private sanitizeUpdateData(updateData: any): any {
    const { firstName, lastName, city, birthDate } = updateData;
    const sanitized: any = {};

    if (firstName !== undefined) sanitized.firstName = firstName;
    if (lastName !== undefined) sanitized.lastName = lastName;
    if (city !== undefined) sanitized.city = city;
    if (birthDate !== undefined) sanitized.birthDate = new Date(birthDate);

    return sanitized;
  }
}