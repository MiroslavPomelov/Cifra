import { Box, Heading, Select } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StatisticProps } from "../statistics/types/statisticProps";
import { User } from "@/app/model/entities/User";



export default function StatisticsPanel(props: StatisticProps) {
    const data: User[] = props.usersData;

    const [selector, setSelector] = useState<string>('city');
    const [chartData, setChartData] = useState<any[]>([]);

    const prepareChartData = (data: User[], selector: string): any[] => {
        if (!data || data.length == 0) {
            return [];
        }

        const groupedData: { [key: string]: number } = {};

        data.forEach((user) => {
            const key = user[selector as keyof User] as string | number;
            groupedData[key] = (groupedData[key] || 0) + 1;
        });


        return Object.entries(groupedData).map(([key, value]) => ({
            [selector]: key, // Use selector as the dataKey
            count: value,
        }));
    };

    useEffect(() => {
        const newData = prepareChartData(data, selector);
        setChartData(newData);
    }, [data, selector]);

    return (
        <Box >
            <Heading mb={'10px'} size={'4'} weight={'medium'}>Статистика пользователей</Heading>
            <Select.Root 
                value={selector}
                onValueChange={setSelector}
                size="2"
                defaultValue="city">
                <Select.Trigger color="blue" radius="large" />
                <Select.Content color="blue">
                    <Select.Item value="city">ГОРОД</Select.Item>
                    <Select.Item value="birthYear">ГОД РОЖДЕНИЯ</Select.Item>
                </Select.Content>
            </Select.Root>

            <ResponsiveContainer width='100%' height={320}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={selector} />
                    <YAxis fontWeight={'bold'} label={{  value: "Количество пользователей", angle: -90, position: 'insideBottomLeft', offset: 15 }}/>
                    <Tooltip />
                    <Legend />
                    <Bar type="monotone" dataKey='count' fill="blue" />
                </BarChart>
            </ResponsiveContainer>

        </Box>
    );
}