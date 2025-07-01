import { PartialType } from '@nestjs/mapped-types';
import { CreateFavouriteProductDto } from './create-favourite-product.dto';

export class UpdateFavouriteProductDto extends PartialType(CreateFavouriteProductDto) {} 