import { Product } from "@/app/model/entities/Product";
import { User } from "@/app/model/entities/User"
import { IObjectable } from "@/app/model/repositories/interfaces/IObjectable";
import { IStringable } from "@/app/model/repositories/interfaces/IStringable";
import { MouseEventHandler } from "react";

export type MainContentProps = {
   data: IStringable[];
   objects: IObjectable[];
   selectedItem: number | null;
   usersData: User[];
   productList: Product[];
   onClick: (index: number) => any;
   onBack: () => void;
   onUpdate: (newData: object) => void;
}