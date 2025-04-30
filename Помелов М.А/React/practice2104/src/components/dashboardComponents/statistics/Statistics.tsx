import { Box } from "@radix-ui/themes";
import { StatisticProps } from "./types/statisticProps";
import { User } from "@/app/model/entities/User";
import StatisticsPanel from "../staticsPanel/StaticsPanel";


export default function Statistics(props: StatisticProps) {    
    
    return (
        <Box p={'20px'} height={'49%'} className="bg-[#d0e3fe]">
            <StatisticsPanel  usersData={props.usersData}/>
        </Box>
    );
}