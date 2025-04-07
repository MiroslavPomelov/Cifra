import CircleProps from "@/types/CircleProps.type";
import { ReactNode } from "react";

function Circle(props: CircleProps): ReactNode {
    const defaultStyle = "rounded-full bg-gradient-to-r from-white to-zinc-500 w-10 h-10";

    const activeStyle = "rounded-full bg-gradient-to-r from-orange-400 to-yellow-300 w-10 h-10";

    const coloredStyle = "rounded-full bg-gradient-to-r from-red-500 to-pink-800 w-10 h-10";

    return (
        <div className={props.isActive ? activeStyle : props.isColored ? coloredStyle : defaultStyle}
            style={{
                gridColumnStart: props.chordX,
                gridColumnEnd: props.chordX,
                gridRowStart: props.chordY,
                gridRowEnd: props.chordY,
            }}>
        </div>
    )
}

export default Circle;