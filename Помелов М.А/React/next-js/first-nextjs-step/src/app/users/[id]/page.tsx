"use client"
import { useParams } from "next/navigation";
type User = {
    id: number,
    name: string,
    age: number
}

export default function DisplayUser() {

    const users: User[] = [
        {
            id: 1,
            name: 'Slava',
            age: 25
        },
        {
            id: 2,
            name: 'Bogdan',
            age: 20
        },
        {
            id: 3,
            name: 'Denis',
            age: 26
        },
    ];

    const { id } = useParams();
    const user: User | undefined = users.find(user => user.id == Number(id))
    return (
        <div className="w-50 h-50 bg-sky-600 rounded-xl flex content-center flex-col place-items-center">
            <p>User ID: {id}</p>
            <p>username: {user?.name}</p>
            <p>username: {user?.age}</p>
        </div>
    )
}