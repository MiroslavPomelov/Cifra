import { Box, Button, Dialog, Flex, ScrollArea, Text, TextField } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { EditProfileProps } from "../editProfile/types/EditProfileProps";
import { useEffect, useState } from "react";
import CardView from "@/app/[id]/CardView/CardView";
import { SelectProductsProps } from "./types/SelectProductsProps";
import { Product } from "@/app/model/entities/Product";


export default function SelectProducts(props: SelectProductsProps) {

    const temp: Product[] = [];
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const addToStorage = (index: number) => {
        if (selectedIndex) {
            temp.push(props.listOfProducts[index]);
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>Select products</Button>
            </Dialog.Trigger>

            <Dialog.Content maxHeight={'640px'} maxWidth="450px">
                <Dialog.Title>Select product</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Form list of User Products
                </Dialog.Description>

                <ScrollArea

                    size="3"
                    type="always"
                    scrollbars="vertical"
                    style={{ height: "49%", backgroundColor: "#d0e3fe" }}
                >

                    <Box p={"30px"} height={'450px'} overflow={'auto'}>
                        {props.listOfProducts.map((item, index) => (
                            <Flex>
                                <Box
                                    key={index}
                                    onClick={() => addToStorage(index)}
                                    p={"10px"}
                                    mb={"10px"}
                                    className="bg-[#dfeefe] rounded-l overflow-auto"

                                >
                                    {item.name}
                                </Box>
                            </Flex>
                        ))}
                    </Box>



                </ScrollArea>

                <Flex gap="3" mb={'4'} mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="solid" color="red">
                            Cancel
                        </Button>
                    </Dialog.Close>

                    <Dialog.Close>
                        <Button onClick={() => { props.returnProductList(temp) }} variant="solid" color="green">Select products</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}

