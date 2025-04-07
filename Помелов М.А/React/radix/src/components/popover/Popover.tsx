import * as Popover from '@radix-ui/react-popover';

export default function PopoverComponent() {
    return (
        <Popover.Root>
            <Popover.Trigger>Наведись и нажми</Popover.Trigger>
            <Popover.Content>
                <p>Здесь дополнительный контент</p>
            </Popover.Content>
        </Popover.Root>
    )
}