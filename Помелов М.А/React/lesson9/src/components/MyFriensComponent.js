import React, { useState } from 'react'

function MyFriensComponent() {
    const [friendsList, setFriendsList] = useState([
        { id: 1, name: 'Bogdan' },
        { id: 2, name: 'Miroslav' },
        { id: 3, name: 'Denis' },
        { id: 4, name: 'Egor' },
        { id: 5, name: 'Sergey' },
    ]);

    const [name, setName] = useState('aad');

    const addFriend = (nameFriend) => {
        const newFriend = { id: friendsList.length + 1, name: nameFriend }

        return [...newFriend, friendsList];
    }


    return (
        <div>
            Add Friend
            <br />
            <input type="text" onChange={setName} />

            <ul>
                {
                    friendsList.map((friend) => (<li key={friend.id}>{friend.name}</li>))
                }
            </ul>

            <button onClick={addFriend}>Добавить друга</button>
        </div>
    )
}

export default MyFriensComponent;