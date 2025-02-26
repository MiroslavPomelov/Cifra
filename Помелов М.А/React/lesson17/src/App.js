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

function TimerComponent() {
  const seconds = useTimer(1000);

  return <div>Прошло секунд: {seconds}</div>
}

function App() {


  return (
    <div>
      <TimerComponent />
    </div>
  );
}

export default App;
