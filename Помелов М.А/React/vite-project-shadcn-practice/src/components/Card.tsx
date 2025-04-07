import Props from "@/types/props";
import { ReactNode } from "react";

function Card({ children }: Props): ReactNode {
    return (
        <div className="rounded-lg border-2-black border-3 my-5">
            <header className="flex place-content-evenly my-10">
                {children}
                <div className="text-neutral-500 text-sm ">
                    <h2 className="flex justify-start">Ivanov Ivan Ivanovich</h2>
                    <p className="flex justify-start">Age: 26</p>
                    <p className="flex justify-start">Email: ivanov@example.com</p>
                </div>
            </header>
        </div>

    )
}

export default Card;