// import React, { useState } from 'react'

// const SimpleForm = () => {
//     const [inputContent, setInputContent] = useState('');

//     const handleInputContentChanging = (event) => {
//         const textBox = event.target; // Отлавливаем целевой элемент в котором поймали событие
//         const textBoxValue = textBox.value;

//         setInputContent(textBoxValue);
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         alert('Your input: ' + inputContent);
//     }

//     return (
//         <form onSubmit={handleSubmit} method='POST'>
//             <label>
//                 Write anything:
//                 <input type="text" value={inputContent} onChange={handleInputContentChanging}/>
//             </label>

//             <button type='submit'>Send</button>
//         </form>
//     )
// }

// export default SimpleForm;