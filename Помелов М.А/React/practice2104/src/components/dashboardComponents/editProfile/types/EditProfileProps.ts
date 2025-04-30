import { IObjectable } from "@/app/model/repositories/interfaces/IObjectable";
import { Product } from "@/app/model/entities/Product";
import { User } from "@/app/model/entities/User";
import { Worker } from "@/app/model/entities/Worker";

export type EditProfileProps = {
    item: IObjectable;
    productList: Product[];
    onUpdate: (newData: object) => void;       
}