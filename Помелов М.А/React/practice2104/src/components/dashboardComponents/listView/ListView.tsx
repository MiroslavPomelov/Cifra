import { Box, Flex, ScrollArea } from "@radix-ui/themes";
import { ReactNode, useState } from "react";
import { MainContentProps } from "../mainContent/types/mainContentProps.type";
import CardView from "@/app/[id]/CardView/CardView";

export default function ListView(props: MainContentProps) {
  return (
    <ScrollArea

      size="3"
      type="always"
      scrollbars="vertical"
      style={{ padding: '40px', height: "49%", backgroundColor: "#d0e3fe" }}
    >
      {props.selectedItem == null || props.data[0] == 'Выберите категорию для отображения списка' ? (
        <Box p={"30px"}>
          {props.data.map((item, index) => (
            <Flex>
              <Box
                key={index}
                onClick={() => props.onClick(index)}
                p={"10px"}
                mb={"10px"}
                className="bg-[#dfeefe] rounded-l "
              >
                {item.toString()}
              </Box>
            </Flex>
          ))}
        </Box>
      ) : (
        <CardView
        productList={props.productList}
          item={props.objects[props.selectedItem]}
          onBack={props.onBack}
          onUpdate={props.onUpdate}
        />
      )}
    </ScrollArea>
  );
}
