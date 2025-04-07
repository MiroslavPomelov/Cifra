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
               {ItemList}
            </ul>
        </div>
    )
}

export default ItemList;


// npx create-react-app first-step
// npm i web-vitals --save-dev