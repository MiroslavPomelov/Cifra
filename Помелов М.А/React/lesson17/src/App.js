import { useEffect, useState } from 'react';
import './App.css';

function useTimer(interval) {
  const [seconds, setSeconds] = useState(0);

  useEffect(
    () => {
      const timer = setInterval(() => {
        setSeconds((prevValue) => prevValue + 1)
      }, interval)

      return () => clearInterval(timer);
    },
    [interval]
  )

  return seconds;
}

function App() {


  return (
    <div>

    </div>
  );
}

export default App;
