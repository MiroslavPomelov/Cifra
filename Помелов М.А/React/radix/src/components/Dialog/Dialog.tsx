// import './Dialog.css';
// import * as Dialog from '@radix-ui/react-dialog';
import { Dialog, Flex, Button, Text, TextField } from '@radix-ui/themes';

export default function DialogComponent() {
    return (
        // <Dialog.Root>
        //     <Dialog.Trigger className='dialog-trigger'>Развернуть диалоговое окно</Dialog.Trigger>
        //     <Dialog.Overlay className='dialog-overlay' />

        //     <Dialog.Content className='dialog-content'>
        //         <Dialog.Title className='dialog-title'>Заголовок</Dialog.Title>
        //         <Dialog.Description className='dialog-description'>Описание диалогового окна</Dialog.Description>
        //         <Dialog.Close className='dialog-close'>Закрыть</Dialog.Close>
        //     </Dialog.Content>
        // </Dialog.Root>




        <Dialog.Root>
            <Dialog.Trigger>
                <Button>Edit profile</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Edit profile</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Make changes to your profile.
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Name
                        </Text>
                        <TextField.Root
                            defaultValue="Freja Johnsen"
                            placeholder="Enter your full name"
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Email
                        </Text>
                        <TextField.Root
                            defaultValue="freja@example.com"
                            placeholder="Enter your email"
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}

