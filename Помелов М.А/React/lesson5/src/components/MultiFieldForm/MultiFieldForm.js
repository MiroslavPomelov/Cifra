import React, { useState } from 'react'

const SimpleForm = () => {
    const [formContent, setFormContent] = useState({
        firstName: '',
        lastName: ''
    });

    const handleFormContentChanging = (event) => {
        const input = event.target; // Отлавливаем форму по событию
        const { name, value, type } = input;

        setFormContent({
            ...formContent,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        alert(`Hello: ${formContent.firstName} - ${formContent.lastName} ${formContent.type}`);
    }

    return (
        <form onSubmit={handleSubmit} method='POST'>
            <label>
                Name:
                <input type="text" name='firstName' value={formContent.firstName} onChange={handleFormContentChanging} />
            </label>
            <br />
            <label>
                Lastname:
                <input type="text" name='lastName' value={formContent.lastName} onChange={handleFormContentChanging} />
            </label>

            <button type='submit'>Send</button>
        </form>
    )
}

export default SimpleForm; 