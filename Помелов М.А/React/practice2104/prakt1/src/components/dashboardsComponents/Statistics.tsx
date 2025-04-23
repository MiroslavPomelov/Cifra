import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import React from "react";
import DashButton from "./ui/DashButton";

export default function Statistics() {

    return (
        <Box height={'49%'} className="bg-blue-300 rounded-xl" style={{ textAlign: 'center', padding: '10px'}}>
            <Heading as="h2">Statistics</Heading>
            <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam optio exercitationem explicabo earum tempore molestiae hic adipisci delectus, rem nulla!</Text>
        </Box>

    );
}