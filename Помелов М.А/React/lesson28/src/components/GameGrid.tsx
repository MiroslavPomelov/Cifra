import GridProps from "@/types/GridProps.type";
import { ReactNode } from "react";
import Circle from "./circle";
import CircleProps from "@/types/CircleProps.type";


function GameGrid(props: CircleProps | number): ReactNode {

    const chords: CircleProps[] = [];

    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {

            if (i == 6 && j == 6) {
                chords.push({
                    isColored: false,
                    isActive: false,
                    chordX: i,
                    chordY: j,
                })
            }

        }
    }

    return (
        <div className="grid grid-rows-11 grid-flow-col gap-2 w-10 h-120 border">
            {chords.map(item => (<Circle chordX={item.chordX} chordY={item.chordY} isActive={item.isActive} isColored={item.isColored} />))}
        </div>
    );
}

export default GameGrid;