"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavigateButton() {
    const router: AppRouterInstance = useRouter();
    const [id, setId] = useState<string>('');

    const handleNavigate: () => void = () => {
        router.push(`/product/${id}`);
    }

    return (
        <div>
            <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter product id" />

            <button onClick={handleNavigate}>Move to Product</button>
        </div>
    );
}