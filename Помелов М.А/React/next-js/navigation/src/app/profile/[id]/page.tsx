"use client"

import { useParams } from "next/navigation";

type User = {
    id: number;
    name: string;
    surname: string;
    login: string;
    phone: string;
    email: string;
}

export default function ProfileId() {

    const { id } = useParams();

    const users: User[] = [
        {
            id: 1,
            name: 'Miroslav',
            surname: 'Pomelov',
            login: 'meros',
            phone: '899999999',
            email: 'mail@.ru'
        },
        {
            id: 2,
            name: 'Denis',
            surname: 'Pinegun',
            login: 'den4ik',
            phone: '899999999',
            email: 'mail@.ru'
        },
        {
            id: 3,
            name: 'Bogdan',
            surname: 'Cherniy',
            login: 'Bog',
            phone: '899999999',
            email: 'mail@.ru'
        }
    ];

    const filterUsers: User | undefined = users.find(user => user.id == Number(id));


    return (
        <div className="text-center">
            <h1>Profile user with ID: {filterUsers?.id}</h1>

            <p>Name: {filterUsers?.name}</p>
            <p>Surname: {filterUsers?.surname}</p>
            <p>Login: {filterUsers?.login}</p>
            <p>Phone: +{filterUsers?.phone}</p>
            <p>Email: {filterUsers?.email}</p>

            <p>Back to list users</p>
        </div>
    );
}