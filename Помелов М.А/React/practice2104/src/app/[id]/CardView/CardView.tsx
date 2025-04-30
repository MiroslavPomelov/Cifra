import { Box, Button, Flex, ScrollArea } from "@radix-ui/themes";
import { CardViewProps } from "./types/CardViewProps";
import EditProfile from "@/components/dashboardComponents/editProfile/EditProfile";


export default function CardView(props: CardViewProps) {   

    return (

        <Box width={'90%'} p={'20px'} height={'90%'} className='rounded-xl bg-[lightgray] place-self-center'>

            <Button onClick={props.onBack}  mb={'10px'} style={{height: '40px', width: '10%', minWidth: '50px', backgroundColor:'#4581b3', color: 'white'}}>Назад</Button>
            <EditProfile productList={props.productList} item={props.item} onUpdate={props.onUpdate}/>
            

            {Object.entries(props.item.toObject()).map(([key, value], index) => (
                <Flex>
                    <Box style={{display:"flex"}} key={index} className='mb-2'>
                        <h2 className="font-bold mr-4">{key}:</h2>
                        <p>{value}</p>
                        
                    </Box>
                </Flex>
            ))}

        </Box>

    );
}