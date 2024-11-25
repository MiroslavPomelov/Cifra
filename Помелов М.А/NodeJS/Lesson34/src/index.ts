import { Repository } from "typeorm";
import { AppDataSource } from "./configuration/DataSource";
import { User } from "./Entities/User";
import { Profile } from "./Entities/Profile";



let tempUser: User;


async function transactionalOperation() {
    await AppDataSource.initialize();


    const quertTunner = AppDataSource.createQueryRunner();
    await quertTunner.connect();
    await quertTunner.startTransaction();

    try {
        const user: User = new User();
        user.name = 'Valeryy';

        await quertTunner.manager.save(user);

        const userProfile: Profile = new Profile();
        userProfile.user = user;
        userProfile.bio = 'Разработчик на английском языке';

        await quertTunner.manager.save(userProfile);
        await quertTunner.commitTransaction();// уже сохранение
    } catch (error) {
        await quertTunner.rollbackTransaction();
    } finally {
        await quertTunner.release();
    }



    //---------------------------------------------------------------------------------------



    // const userRepo: Repository<User> = AppDataSource.getRepository(User);


    // try {
    //     AppDataSource.transaction(async transactionalEntityManager => {
    //         const user: User = new User();
    //         user.name = 'Valeryy';


    //         tempUser = user;
    //         await transactionalEntityManager.save(user);


    //         const userProfile: Profile = new Profile();
    //         userProfile.user = user;
    //         userProfile.bio = 'Разработчик на английском языке';


    //         await transactionalEntityManager.save(userProfile); // 1 (Рекомендуемый (на запись))
    //         transactionalEntityManager.createQueryBuilder() // 2 (Рекомендуемый (на чтение))
    //         userRepo.create(); // 3 плохой (но существующий)
    //     })
    // } catch (error) {

    // }
}