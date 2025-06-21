import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser: User = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists!');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password_hash: hashedPassword,
    });

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
    const user = await this.findOne(id);
    const { password_hash, firstName, lastName, city, birthDate, ...rest } = updateUserDto;

    if (password_hash) {
      user.password_hash = await bcrypt.hash(password_hash, 10);
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
      console.warn(`Attempt to update restricted fields for user ${id}:`, Object.keys(rest));
    }

    return this.userRepository.save(user);
  }

  async deactivate(id: number): Promise<User> {
    const user = await this.findOne(id);
    user.isActive = false;
    return this.userRepository.save(user);
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
}