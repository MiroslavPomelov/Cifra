import * as DropdownMenu from "@radix-ui/react-dropdown-menu";


export default function DropdownComponent() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger >Menu</DropdownMenu.Trigger>

            <DropdownMenu.Content>
                <DropdownMenu.Item>Element 1</DropdownMenu.Item>
                <DropdownMenu.Item>Element 2</DropdownMenu.Item>
                <DropdownMenu.Item>Element 3</DropdownMenu.Item>
            </DropdownMenu.Content>

        </DropdownMenu.Root>
    )

}