import AuthButton from '@/app/components/AuthButton'
import React from 'react'
import { Box, Button, Input, Stack } from '@chakra-ui/react'

const AuthForm = () => {
    return (
        <form className='flex-col p-4'>
            <Stack spacing={3}>
                <Input className='m-5' variant='outline' placeholder='Введите логин' />

                <Input variant='outline' placeholder='Введите пароль' />

                <Box className='flex justify-center'>

                    <Button className='w-[200px] ' colorScheme='pink' variant='solid'>
                        Button
                    </Button>
                </Box>
            </Stack>


        </form>
    )
}

export default AuthForm