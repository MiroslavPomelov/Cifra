"use client"

import { useParams } from "next/navigation";

export default function BlogPost() {
    const { id } = useParams();
    return <h1>Posts blog with ID: {id}</h1>
};