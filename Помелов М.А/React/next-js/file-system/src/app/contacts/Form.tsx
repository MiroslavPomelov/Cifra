'use client'

import { useState } from "react";

export default function Form() {

    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [date, setDate] = useState<string>('');

    const showData = () => {
        console.log('You send Form!');
    }

    return (
        <form onSubmit={showData}>
            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
            <input onChange={(e) => setSurname(e.target.value)} type="text" placeholder="Surname" />
            <input onChange={(e) => setDate(e.target.value)} type="date" />

            <button type="submit"></button>
        </form>
    );
}