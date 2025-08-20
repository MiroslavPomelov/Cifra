import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ShopService } from './shop/shop.service';
import { Shop } from './shop/entities/shop.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

async function seedShops() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const shopRepository = app.get<Repository<Shop>>(getRepositoryToken(Shop));

   // Перейти в каталог
  // npx ts-node src/seed-shops.ts 

  const shops = [
    {
      name: 'Цветочный рай',
      description: 'Эксклюзивные букеты и композиции для особых случаев',
      email: 'shop1@flowerparadise.ru',
      password: 'password123',
      address: 'ул. Цветочная, 15, Москва',
      phone: '+7 (495) 123-45-67',
    },
    {
      name: 'Букет-Сервис',
      description: 'Быстрая доставка свежих цветов по всей России',
      email: 'shop2@bouquet-service.ru',
      password: 'password123',
      address: 'пр. Мира, 42, Санкт-Петербург',
      phone: '+7 (812) 987-65-43',
    },
    {
      name: 'Розарий',
      description: 'Специализация на розах и элитных букетах',
      email: 'shop3@roserium.ru',
      password: 'password123',
      address: 'ул. Садовая, 8, Казань',
      phone: '+7 (843) 456-78-90',
    },
    {
      name: 'Весенние цветы',
      description: 'Тюльпаны, нарциссы и весенние композиции',
      email: 'shop4@springflowers.ru',
      password: 'password123',
      address: 'ул. Весенняя, 25, Екатеринбург',
      phone: '+7 (343) 234-56-78',
    },
    {
      name: 'Экзотика',
      description: 'Экзотические цветы и редкие растения',
      email: 'shop5@exoticflowers.ru',
      password: 'password123',
      address: 'ул. Тропическая, 12, Сочи',
      phone: '+7 (862) 345-67-89',
    },
  ];

  console.log('Начинаем заполнение магазинов...');

  for (const shopData of shops) {
    try {
      // Проверяем, существует ли магазин с таким именем
      const existing = await shopRepository.findOne({ where: { name: shopData.name } });
      if (existing) {
        console.log(`⏭️ Магазин "${shopData.name}" уже существует, пропускаем`);
        continue;
      }

      // Хешируем пароль
      const hashedPassword = await bcrypt.hash(shopData.password, 10);
      
      // Создаем объект с правильными полями для Shop entity
      const shopEntity = shopRepository.create({
        name: shopData.name,
        description: shopData.description,
        email: shopData.email,
        password_hash: hashedPassword,
        address: shopData.address,
        phone: shopData.phone,
        isActive: true,
      });
      
      const shop = await shopRepository.save(shopEntity);
      
      console.log(`✅ Магазин "${shop.name}" создан с ID: ${shop.id}`);
    } catch (error) {
      console.error(`❌ Ошибка при создании магазина "${shopData.name}":`, error.message);
    }
  }

  console.log('Заполнение магазинов завершено!');
  await app.close();
}

seedShops().catch(console.error);
