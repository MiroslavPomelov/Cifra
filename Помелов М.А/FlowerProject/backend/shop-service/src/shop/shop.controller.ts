import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException, Req, Logger, UseGuards } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { JwtService } from '@nestjs/jwt';
import { ServiceAuthGuard } from './guards/service-auth.guard';

@UseGuards(ServiceAuthGuard)
@Controller('shops')
export class ShopController {
  private readonly logger = new Logger(ShopController.name);
  constructor(private readonly shopService: ShopService, private readonly jwtService: JwtService) {}

  @Post()
  async create(@Body() createShopDto: CreateShopDto) {
    try {
      return await this.shopService.create(createShopDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('registration')
  async register(@Body() createShopDto: CreateShopDto) {
    return this.shopService.register(createShopDto);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.shopService.login(body.email, body.password);
  }

  @Get()
  async findAll(@Req() req) {
    this.logger.log('findAll called');
    this.logger.log('Authorization: ' + req.headers['authorization']);
    try {
      return await this.shopService.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.shopService.findOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateShopDto: UpdateShopDto) {
    try {
      return await this.shopService.update(id, updateShopDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.shopService.remove(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
} 