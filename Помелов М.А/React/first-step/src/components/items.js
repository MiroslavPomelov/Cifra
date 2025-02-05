import React, { useState } from 'react'

const ItemList = () => {
    const [item, setItem] = useState();
    const [inputValue, setInputValue] = useState();


    const setItems = () => {
        setItem([...item, input]);
    }

    return (
        <div></div>
    ) 
}

export default ItemList;