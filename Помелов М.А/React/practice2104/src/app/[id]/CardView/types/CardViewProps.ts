import { Product } from "@/app/model/entities/Product";
import { User } from "@/app/model/entities/User";
import { Worker } from "@/app/model/entities/Worker";
import { IObjectable } from "@/app/model/repositories/interfaces/IObjectable";
import { IStringable } from "@/app/model/repositories/interfaces/IStringable";

export type CardViewProps = {
    item: IObjectable;
    productList: Product[]
    onBack: () => void; 
    onUpdate: (newData: object) => void;  
}