import Props from "@/types/props";
import { ReactNode } from "react";

function Card({ children }: Props): ReactNode {
    return (
        <div className="rounded-lg border-2-black">
            <header>
                <div >
                    {children}
                </div>
            </header>
        </div>

    )
}

export default Card;