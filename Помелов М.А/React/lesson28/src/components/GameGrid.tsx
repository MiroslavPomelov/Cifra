import GridProps from "@/types/GridProps.type";
import { ReactNode } from "react";
import Circle from "./circle";
import CircleProps from "@/types/CircleProps.type";


function GameGrid(props: GridProps): ReactNode {

    const chords: CircleProps[] = [];

    for (let i = 1; i < 12; i++) {
        for (let j = 1; j < 12; j++) {

            if (i == props.activeCellChordX && j == props.activeCellChordY) {
                chords.push({
                    isColored: false,
                    isActive: true,
                    chordX: i,
                    chordY: j,
                });

                continue;
            }

            chords.push({
                isColored: false,
                isActive: false,
                chordX: i,
                chordY: j,
            });
        }
    }

    return (
        <div className="grid grid-rows-11 grid-col-11 gap-2 w-10 h-120">
            {chords.map(item => (<Circle chordX={item.chordX} chordY={item.chordY} isActive={item.isActive} isColored={item.isColored} />))}
        </div>
    );
}

export default GameGrid;