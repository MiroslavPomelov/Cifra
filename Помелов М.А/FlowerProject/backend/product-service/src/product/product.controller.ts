import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req, Query, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ServiceAuthGuard } from './guards/service-auth.guard';
import { JwtShopGuard } from './guards/jwt-shop.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

@UseGuards(ServiceAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get('featured')
  async findFeatured() {
    return this.productService.findFeatured();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.productService.findById(id);
  }


  @Get('/shop/:shopId')
  async findByShop(@Param('shopId') shopId: number) {
    return this.productService.findByShop(shopId);
  }


  // @UseGuards(ServiceAuthGuard)
  // @Post('/by-ids')
  // async findByIds(@Body('ids') ids: number[]) {
  //   return this.productService.findByIds(ids);
  // }


  @UseGuards(JwtShopGuard)
  @Post()
  async create(@Body() dto: CreateProductDto, @Req() req) {
    return this.productService.create(dto, req.shopId);
  }

  @UseGuards(JwtShopGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateProductDto, @Req() req) {
    return this.productService.update(id, dto, req.shopId);
  }

  @UseGuards(JwtShopGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req) {
    return this.productService.remove(id, req.shopId);
  }

  @UseGuards(JwtShopGuard)
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        try {
          const baseDir = process.env.PRODUCT_IMAGES_DIR || '/usr/share/nginx/images';
          const shopId = req['shopId'];
          if (!shopId) return cb(new BadRequestException('shopId missing in request'), undefined);
          const dir = `${baseDir}/products/${shopId}`;
          if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
          cb(null, dir);
        } catch (e) {
          cb(e as any, undefined);
        }
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        const safeName = `product_${uniqueSuffix}${extname(file.originalname || '')}`;
        cb(null, safeName);
      }
    }),
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  }))
  async uploadImage(@UploadedFile() file: any, @Req() req) {
    if (!file) {
      throw new BadRequestException('Файл не загружен');
    }
    const shopId = req['shopId'];
    const filesBaseUrl = process.env.FILES_BASE_URL || 'http://localhost:8080';
    const publicUrl = `${filesBaseUrl}/images/products/${shopId}/${file.filename}`;
    return {
      url: publicUrl,
      fileName: file.filename,
      size: file.size,
      mimeType: file.mimetype,
    };
  }
} 