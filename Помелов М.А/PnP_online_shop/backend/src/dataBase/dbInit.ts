// Создание БД

import { Repository } from "typeorm";
import { AppDataSource } from "./configuration/AppDataSource";
import { Product } from "./entities/Product";
import { User } from "./entities/User";
import { productsCreator, usersCreator } from "./dbCreators/creator";
import { Order } from "./entities/Order";

export async function createDataBase() {
   await AppDataSource.initialize();

   const UsersRepository: Repository<User> = AppDataSource.getRepository(User);
   const ProductRepository: Repository<Product> = AppDataSource.getRepository(Product);
  


   const listOfUsers: User[] = usersCreator();
   const listOfProducts: Product[] = productsCreator();


   await UsersRepository.save(listOfUsers);
   await ProductRepository.save(listOfProducts); 

}

