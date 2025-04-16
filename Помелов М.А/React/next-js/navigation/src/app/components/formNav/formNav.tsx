"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function FormNav() {

    const [id, setId] = useState<string | null>('');
    const router: AppRouterInstance = useRouter();

    const handleClick: () => void = () => {
        router.push(`/profile/${id}`);
    }

    return (
        <div>
            <h1>Navigate on profile</h1>

            <input
                type="text"
                placeholder="Please write Id user"
                onChange={(e) => setId(e.target.value)} />

            <button onClick={handleClick}>Go to profile</button>
        </div>
    )
}