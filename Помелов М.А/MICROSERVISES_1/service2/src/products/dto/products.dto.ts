import { IsNotEmpty, IsString } from "class-validator";

class ProductDto {
    @IsString()        
    name: string;

    @IsString()
    description: string;

    @IsString()     
    price: string;    
}
  
export default ProductDto;
  