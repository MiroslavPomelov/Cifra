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
  public async getUserByUsername(searchingUsername: string): Promise<User | null> {
    const userRepo: Repository<User> = this.dataSource.getRepository(User);
    const queryBuilder: SelectQueryBuilder<User> =
      userRepo.createQueryBuilder("user");
    const user: User | null = await queryBuilder
      .select()
      .where("username = :username", { username: searchingUsername })
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

  public async addUser(user: User) {
    const userRepo: Repository<User> = this.dataSource.getRepository(User);
    
    console.log('Tut1')
    await userRepo
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          age: user.age,
          password: user.password,
          order: undefined,
        },
      ])
      .execute();

      console.log('Tut2')
  }
  public async changeUserData(user: User): Promise<void> {
    const userRepo: Repository<User> = this.dataSource.getRepository(User);
    const queryBuilder: SelectQueryBuilder<User> =
      userRepo.createQueryBuilder("user");
    if (user){
      await queryBuilder
    .update(User)
    .set(user)
    .where('id = :id', {id:user.id})    
    .execute();
    }      
  }
}
