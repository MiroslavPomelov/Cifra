import './App.css';
import { useState } from 'react';
import React from 'react';



// class Greeting extends React.Component {
//   render() {
//     return <h1>Hello, {this.props.name}!</h1>
//   }
// }


function Component(props) {
  const [value, setValue] = useState(props.value);

  return (
    <div>
      <h1>Welcome, {props.username}
        <br />
        Your value: {value}
      </h1>

      <button onClick={() => setValue(value * 2)}>Push me</button>
    </div>
  )
}


// Главный компонент приложения
function App() {
  //LESSON2
  return (
    <div className='App'>
      <Component value={Math.floor(Math.random() * 9) + 1} username='Valeriy' />
      <Component value={Math.floor(Math.random() * 9) + 1} username='Elena' />
      <Component value={Math.floor(Math.random() * 9) + 1} username='Dima' />
    </div>
  )





  //LESSON11
  // const [count, setCount] = useState(0);

  // const addClick = () => {
  //   setCount(count + 1);
  // }

  // const subClick = () => {
  //   setCount(count - 1);
  // }

  // const clearlick = () => {
  //   setCount(0);
  // }

  // const [inputData, setinputData] = useState('fgh');
  // const [headerData, setheaderData] = useState("");

  // const handleTextChanged = (event) => {
  //   setinputData(event.target.value);
  // }
  // const handleHeaderChanged = () => {
  //   setheaderData(inputData);
  // }

  // return (
  //   <div className='App'>
  //     <header className='App-header'>
  //       <h1>React-счетчик</h1>
  //       <p>Текущее значение: {count}</p>
  //       <button onClick={addClick}>Увеличить</button>
  //       <button onClick={subClick}>Уменьшть</button>
  //       <button onClick={clearlick}>Обнулить</button>

  //       <h1>{headerData}</h1>
  //       <input type="text" onChange={handleTextChanged} />
  //       <button onClick={handleHeaderChanged} >Изменить</button>
  //     </header>
  //   </div>
  // )

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
