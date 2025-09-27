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

  // docker exec -it shop-service npx ts-node src/seed-shops.ts
  // docker exec -it product-service npx ts-node src/seed-products.ts

  const shops = [
    {
      name: 'Цветочный рай',
      description: 'Эксклюзивные букеты и композиции для особых случаев',
      email: 'shop1@flowerparadise.ru',
      password: 'password123',
      address: 'ул. Цветочная, 15, Москва',
      phone: '+7 (495) 123-45-67',
      logoUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200',
    },
    {
      name: 'Букет-Сервис',
      description: 'Быстрая доставка свежих цветов по всей России',
      email: 'shop2@bouquet-service.ru',
      password: 'password123',
      address: 'пр. Мира, 42, Санкт-Петербург',
      phone: '+7 (812) 987-65-43',
      logoUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200',
    },
    {
      name: 'Розарий',
      description: 'Специализация на розах и элитных букетах',
      email: 'shop3@roserium.ru',
      password: 'password123',
      address: 'ул. Садовая, 8, Казань',
      phone: '+7 (843) 456-78-90',
      logoUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=200',
    },
    {
      name: 'Весенние цветы',
      description: 'Тюльпаны, нарциссы и весенние композиции',
      email: 'shop4@springflowers.ru',
      password: 'password123',
      address: 'ул. Весенняя, 25, Екатеринбург',
      phone: '+7 (343) 234-56-78',
      logoUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c5a2?w=200',
    },
    {
      name: 'Экзотика',
      description: 'Экзотические цветы и редкие растения',
      email: 'shop5@exoticflowers.ru',
      password: 'password123',
      address: 'ул. Тропическая, 12, Сочи',
      phone: '+7 (862) 345-67-89',
      logoUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200',
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
        logoUrl: shopData.logoUrl,
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
