import { ReactNode } from "react";

interface ButtonProps {
    text: string;
    onClick: () => void
}

export default function Button({ text, onClick }: ButtonProps): ReactNode {
    return (
        <button onClick={onClick}>{text}</button>
    )
}