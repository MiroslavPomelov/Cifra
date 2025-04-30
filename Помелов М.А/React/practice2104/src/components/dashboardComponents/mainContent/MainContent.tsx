import { Box, Flex } from "@radix-ui/themes";
import ListView from "../listView/ListView";
import Statistics from "../statistics/Statistics";
import { MainContentProps } from "./types/mainContentProps.type";

export default function MainContent(props: MainContentProps) {
  
  return (
    <Flex width={"69%"} direction={"column"} justify={"between"}>
      <ListView productList={props.productList} usersData={props.usersData} data={props.data} objects={props.objects} onClick={props.onClick} onBack={props.onBack} selectedItem={props.selectedItem} onUpdate={props.onUpdate}/> 
      <Statistics usersData={props.usersData}/>
    </Flex>
  );
}
