import { Product } from "@/model/entities/Product";
import { User } from "@/model/entities/User";
import { Worker } from "@/model/entities/Worker";


export type MainContentProps = {
    users?: User[];
    products?: Product[];
    workers?: Worker[];
}