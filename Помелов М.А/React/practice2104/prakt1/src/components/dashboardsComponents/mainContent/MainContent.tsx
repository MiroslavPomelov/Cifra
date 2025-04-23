import { Flex } from "@radix-ui/themes";
import ListView from "../ListView";
import Statistics from "../Statistics";
import { MainContentProps } from "./types/mainContentProps.type";


export default function MainContent({ data }: { data: MainContentProps }) {

    return (
        <Flex ml={'20px'} direction={'column'} justify={'between'} width={'70%'} >
            <ListView>
                {data.map((item, index) => (
                    <ul>
                        <li key={index}></li>
                    </ul>
                ))}
            </ListView>
            <Statistics />
        </Flex>
    );



}