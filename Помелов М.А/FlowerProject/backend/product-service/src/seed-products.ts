import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductService } from './product/product.service';
import { Product } from './product/entities/product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

async function seedProducts() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productService = app.get(ProductService);
  const productRepository = app.get<Repository<Product>>(getRepositoryToken(Product));

  // Перейти в каталог продуктов моих
  // px ts-node src/seed-products.ts 
  // npm run seed.

  const products = [
    // Магазин 1 - Цветочный рай
    {
      name: 'Букет "Нежность"',
      description: 'Нежный букет из розовых роз и белых тюльпанов, оформленный в пастельных тонах',
      price: 2500,
      imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
      shopId: 1,
    },
    {
      name: 'Композиция "Элегантность"',
      description: 'Элегантная композиция из красных роз и белых лилий для особых случаев',
      price: 3200,
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
      shopId: 1,
    },
    {
      name: 'Букет "Солнечное настроение"',
      description: 'Яркий букет из подсолнухов и желтых роз, поднимающий настроение',
      price: 1800,
      imageUrl: 'https://images.unsplash.com/photo-1597848212624-e17eb5d5e3e1?w=400',
      shopId: 1,
    },
    {
      name: 'Композиция "Изысканность"',
      description: 'Изысканная композиция из орхидей и белых роз в стеклянной вазе',
      price: 4500,
      imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
      shopId: 1,
    },

    // Магазин 2 - Букет-Сервис
    {
      name: 'Букет "Классика"',
      description: 'Классический букет из красных роз, идеальный подарок для любой дамы',
      price: 2800,
      imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400',
      shopId: 2,
    },
    {
      name: 'Композиция "Весенняя свежесть"',
      description: 'Нежная композиция из розовых пионов и белых роз',
      price: 3600,
      imageUrl: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400',
      shopId: 2,
    },
    {
      name: 'Букет "Праздник"',
      description: 'Яркий праздничный букет из разноцветных тюльпанов',
      price: 2200,
      imageUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c5a2?w=400',
      shopId: 2,
    },
    {
      name: 'Композиция "Эксклюзив"',
      description: 'Эксклюзивная композиция из редких орхидей и роз',
      price: 5200,
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      shopId: 2,
    },

    // Магазин 3 - Розарий
    {
      name: 'Букет "Королева роз"',
      description: 'Роскошный букет из 25 красных роз премиум-класса',
      price: 3800,
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
      shopId: 3,
    },
    {
      name: 'Композиция "Белая невеста"',
      description: 'Элегантная композиция из белых роз и лилий для свадеб',
      price: 4200,
      imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
      shopId: 3,
    },
    {
      name: 'Букет "Розовый закат"',
      description: 'Романтичный букет из розовых роз различных оттенков',
      price: 2900,
      imageUrl: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400',
      shopId: 3,
    },
    {
      name: 'Композиция "Королевская"',
      description: 'Изысканная композиция из бордовых роз и орхидей',
      price: 4800,
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      shopId: 3,
    },

    // Магазин 4 - Весенние цветы
    {
      name: 'Букет "Весенняя радость"',
      description: 'Свежий букет из тюльпанов и нарциссов, символизирующий весну',
      price: 1600,
      imageUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c5a2?w=400',
      shopId: 4,
    },
    {
      name: 'Композиция "Пробуждение"',
      description: 'Нежная композиция из белых тюльпанов и гиацинтов',
      price: 2100,
      imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
      shopId: 4,
    },
    {
      name: 'Букет "Солнечные лучи"',
      description: 'Яркий букет из желтых нарциссов и тюльпанов',
      price: 1800,
      imageUrl: 'https://images.unsplash.com/photo-1597848212624-e17eb5d5e3e1?w=400',
      shopId: 4,
    },
    {
      name: 'Композиция "Весенняя свежесть"',
      description: 'Свежая композиция из разноцветных тюльпанов',
      price: 2400,
      imageUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c5a2?w=400',
      shopId: 4,
    },

    // Магазин 5 - Экзотика
    {
      name: 'Композиция "Тропический рай"',
      description: 'Экзотическая композиция из орхидей и антуриумов',
      price: 3800,
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      shopId: 5,
    },
    {
      name: 'Букет "Экзотика"',
      description: 'Уникальный букет из редких тропических цветов',
      price: 4200,
      imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
      shopId: 5,
    },
    {
      name: 'Композиция "Остров мечты"',
      description: 'Экзотическая композиция из орхидей и бромелиевых',
      price: 3600,
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      shopId: 5,
    },
    {
      name: 'Букет "Тропическая ночь"',
      description: 'Загадочная композиция из темных орхидей и экзотических цветов',
      price: 4500,
      imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
      shopId: 5,
    },
  ];

  console.log('Начинаем заполнение продуктов...');

  for (const productData of products) {
    try {
      // Проверяем, существует ли продукт с таким именем в этом магазине
      const existing = await productRepository.findOne({
        where: {
          name: productData.name,
          shopId: productData.shopId
        }
      });

      if (existing) {
        console.log(`⏭️ Продукт "${productData.name}" уже существует в магазине ${productData.shopId}, пропускаем`);
        continue;
      }

      const product = await productService.create(productData, productData.shopId);
      console.log(`✅ Продукт "${product.name}" создан с ID: ${product.id}`);
    } catch (error) {
      console.error(`❌ Ошибка при создании продукта "${productData.name}":`, error.message);
    }
  }

  console.log('Заполнение продуктов завершено!');
  await app.close();
}

seedProducts().catch(console.error);
