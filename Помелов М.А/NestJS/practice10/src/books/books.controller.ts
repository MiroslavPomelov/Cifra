import { Controller, Delete, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuardsGuard } from './guards/auth-guards.guard';


export enum UserRole {
  Admin = 'admin',
  User = 'user'
}

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get()
  public async getAll(): Promise<string> {
    return 'getAll';
  }

  @Post()
  @SetMetadata('roles', ['admin']) 
  @UseGuards(AuthGuardsGuard)
  public async getAdmin(): Promise<string> {
    return 'getAdmin';
  }

  @Delete()
  @SetMetadata('roles', ['admin']) 
  @UseGuards(AuthGuardsGuard)
  public async del(): Promise<string> {
    return 'Delete';
  }
}
