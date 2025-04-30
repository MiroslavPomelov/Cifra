import { Button } from "@radix-ui/themes";
import { ReactNode } from "react";
import { ListVariantButtonProps } from "../types/ListVariantButtonProps.type";

export default function ListVariantsButton(props: ListVariantButtonProps) {
    return(
        <Button onClick={props.onClick} mb={'10px'} style={{height: '40px', width: '100%', backgroundColor:'#4581b3', color: 'white'}}>{props.text}</Button>
    )
}