import React, { useState } from 'react';


function FormWithValidation() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });



    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let isValid = true;
        let newErrors = { email: '', password: '' };



        if (!formData.email.includes('@')) {
            newErrors.email = 'Введите корректный email';
            isValid = false;
        }


        if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен содержать не менее 6 символов';
            isValid = false;
        }



        setErrors(newErrors);
        return isValid;
    };



    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            alert('Форма успешно отправлена');
        }
        
    };

    
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="text" name="email"
                value={formData.email} onChange={handleChange} />
                <p>{errors.email}</p>
            </label>
            <br />
            <label>
                Пароль:
                <input type="password" name="password"
                value={formData.password} onChange={handleChange} />
                <p>{errors.password}</p>
            </label>
            <br />
            <button type="submit">Отправить</button>
        </form>
    );
}



export default FormWithValidation;