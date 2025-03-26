import Props from "@/types/props";
import { ReactNode } from "react";

function ProfilePage({ children }: Props): ReactNode {
    return (
        <div>
            <h1 className="bg-gradient-to-r from-green-400 to-black text-white rounded-lg text-2xl font-sans p-3">Личный кабинет</h1>
            {children}
        </div>

    )
}

export default ProfilePage;