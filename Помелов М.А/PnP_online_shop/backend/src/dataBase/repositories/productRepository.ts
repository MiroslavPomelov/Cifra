import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { User } from "../entities/User";
import { Product } from "../entities/Product";



export class ProductRepository {
    constructor(private readonly dataSource: DataSource) { }

    public async getProductsByCategoryAndType(category: string, type: string): Promise<Product[] | null> {
        const productRepo: Repository<Product> = this.dataSource.getRepository(Product);
        const queryBuilder: SelectQueryBuilder<Product> =
            productRepo.createQueryBuilder("concreteProduct");
        const concreteProducts: Product[] | null = await queryBuilder
            .select()
            .where("category = :category", { category: category })
            .andWhere("type == :type", { type: type })
            .getMany();
        return concreteProducts;
    }


    public async getProductByCategory(searchingCategory: string): Promise<Product | null> {
        const productRepo: Repository<Product> = this.dataSource.getRepository(Product);
        const queryBuilder: SelectQueryBuilder<Product> =
            productRepo.createQueryBuilder("categoryProduct");
        const categoryProduct: Product | null = await queryBuilder
            .select()
            .where("category = :category", { category: searchingCategory })
            .getOne();

        return categoryProduct;
    }


    public async getProductByType(type: string): Promise<Product | null> {
        const productRepo: Repository<Product> = this.dataSource.getRepository(Product);
        const queryBuilder: SelectQueryBuilder<Product> =
        productRepo.createQueryBuilder("typeProduct");
        const typeProduct: Product | null = await queryBuilder
            .select()
            .where("type = :type", { type: type })
            .getOne();

        return typeProduct;
    }

    public async getAllProducts(): Promise<Product[] | null> {
        const productRepo: Repository<Product> = this.dataSource.getRepository(Product);

        const queryBuilder: SelectQueryBuilder<Product> =
        productRepo.createQueryBuilder("product");

        const products: Product[] | null = await queryBuilder.getMany();

        return products;
    }

    public async addProduct(product: Product) {
        const productRepo: Repository<Product> = this.dataSource.getRepository(Product);

        await productRepo
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values([
                {
                    category: product.category,
                    type: product.type,
                    price: product.price,
                    quantity: product.quantity,
                    image: product.image,
                },
            ])
            .execute();
    }
}
