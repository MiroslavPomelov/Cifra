import React, { useCallback, useState, memo } from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import List from './components/List';

// const memoizeCallback = useCallback(() => {

// }, [dependesies]);

// Компонен, который не мемоизирован
// const Child = (props) => {
//   console.log('Дочерний компонень перерендерился!');
//   return <button onClick={props.propsFunction}>Click me </button>
// }

// const MemoizedChild = React.memo((props) => {
//   console.log('Дочерний222 компонень перерендерился!');
//   return <button onClick={props.propsFunction}>Click me</button>
// })

// const Parent = () => {
//   console.log('Родительский компонент перерендерился');
//   const [counter, setCounter] = useState(0);

//   const propsFunction = useCallback(() => {
//     console.log('Button clicked');
//     // setCounter(counter + 1);
//     setCounter((prevConter) => prevConter + 1);
//   }, []);

//   return (
//     <>
//       <p>{counter}</p>
//       {/* <button onClick={() => SetCounter(counter + 1)}>Add count</button> */}
//       <Child propsFunction={propsFunction} />
//       <MemoizedChild propsFunction={propsFunction} />
//     </>
//   )
// }

function App() {
  const [valueList, setValueList] = useState([]);
  const [valueInput, setValueInput] = useState('');

  const buttonFunction = (event) => {
    setValueInput([...valueList, event.target.value]);
  }

  const inputFunction = (event) => {
    setValueInput(event.target.value);
  }



  return (
    <div>
      {/* <Parent /> */}
      <Input inputFunction={inputFunction}/>
      <Button buttonFunction={buttonFunction}/>
      <List />

    </div>
  );
}

export default App;
