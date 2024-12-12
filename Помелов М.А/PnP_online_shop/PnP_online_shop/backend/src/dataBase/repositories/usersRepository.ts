import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { User } from "../entities/User";

export class UserRepository {
  constructor(private readonly dataSource: DataSource) {}

  public async getUserByPasswordAndUsername(
    username: string,
    password: string
  ): Promise<User | null> {
    const userRepo: Repository<User> = this.dataSource.getRepository(User);
    const queryBuilder: SelectQueryBuilder<User> =
      userRepo.createQueryBuilder("user");
    const user: User | null = await queryBuilder
      .select()
      .where("username = :username", { username: username })
      .andWhere("password == :password", { password: password })
      .getOne();

    return user;
  }  
  public async getUserByUsername(
    username: string
  ): Promise<User | null> {
    const userRepo: Repository<User> = this.dataSource.getRepository(User);
    const queryBuilder: SelectQueryBuilder<User> =
      userRepo.createQueryBuilder("user");
    const user: User | null = await queryBuilder
      .select()
      .where("username = :username", { username: username })
      .getOne();

    return user;
  }

  public async getUserById(id: number): Promise<User | null> {
    const userRepo: Repository<User> = this.dataSource.getRepository(User);
    const queryBuilder: SelectQueryBuilder<User> =
      userRepo.createQueryBuilder("user");
    const user: User | null = await queryBuilder
      .select()
      .where("id = :id", { id: id })
      .getOne();

    return user;
  }

  public async getAllUsers(): Promise<User[] | null> {
    const userRepo: Repository<User> = this.dataSource.getRepository(User);
    const queryBuilder: SelectQueryBuilder<User> =
      userRepo.createQueryBuilder("user");
    const users: User[] | null = await queryBuilder.getMany();

    return users;
  }
}
