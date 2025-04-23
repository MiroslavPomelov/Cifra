import { Box, Flex, Grid } from "@radix-ui/themes";
import React from "react";
import DashButton from "./ui/DashButton";

export default function ListView() {

    return (
        <Box  height={'49%'} className="bg-blue-300 rounded-xl" style={{textAlign: 'center', padding: '10px'}}>
            Choose the category for Product list
        </Box>

    );
}