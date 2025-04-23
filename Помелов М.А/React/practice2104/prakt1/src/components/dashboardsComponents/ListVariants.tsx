import { Box, Flex, Grid } from "@radix-ui/themes";
import React from "react";
import DashButton from "./ui/DashButton";
import { ListVariantButtonProps } from "./mainContent/types/ListVariantButtonProps.type";

export default function ListVariants({ buttonsPayload }: { buttonsPayload: ListVariantButtonProps[] }) {

    return (
        <Flex direction={'column'} width={'30%'} className="bg-blue-300 rounded-xl">
            {/* <DashButton title={'Users'} />
            <DashButton title={'Products'} />
            <DashButton title={'Workers'} /> */}

            {buttonsPayload.map((item: ListVariantButtonProps, index: number) => {
                return (
                    <DashButton onClick={item.onClick} title="Users" />
                )
            })}
        </Flex>



    );
}