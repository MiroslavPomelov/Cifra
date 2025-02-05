import React, { useState } from 'react'

const ItemList = () => {
    const [item, setItem] = useState();
    const [inputValue, setInputValue] = useState();


    const setItems = () => {
        setItem([...item, input]);
    }

    return (
        <div>
            <ul>
                <li>Apple</li>
                <li>XApple</li>
                <li>MApple</li>
                <li>DApple</li>
            </ul>
        </div>
    )
}

export default ItemList;


// npx create-react-app first-step
// npm i web-vitals --save-dev