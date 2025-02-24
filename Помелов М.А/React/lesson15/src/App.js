
import { useMemo, useState } from 'react';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState('');

  // Дорогостоящая функция
  const computeExpensuveValue = (num) => {
    console.log('Computing...');
    return num * 2;
  }

  const expensiveValue = useMemo(() => {
    return computeExpensuveValue(counter);
  }, [counter]);
  

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <h2>Expensive value: {expensiveValue}</h2>

      <input type="text" value={text} onChange={(event) => setText(event.target.value)} placeholder='Enter u text value' />

      <button onClick={() => setCounter(counter + 1)}>Increase counter value</button>
    </div>
  );
}

export default App;
