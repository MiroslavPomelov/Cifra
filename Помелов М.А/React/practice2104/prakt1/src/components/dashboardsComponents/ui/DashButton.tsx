import { Button } from "@radix-ui/themes";
import { ListVariantButtonProps } from "../mainContent/types/ListVariantButtonProps.type";

export default function DashButton(title: ListVariantButtonProps) {

    return (
        <Button onClick={title.onClick} m={'10px'} style={{ height: '40px' }} className="bg-blue-500 p-3 text-white rounded-xl transition-all hover:bg-blue-700">{title.title}</Button>
    );
}