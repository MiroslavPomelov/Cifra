import { useEffect, useState } from 'react';
import './App.css';

function useTimer(interval) {
  const [active, setActive] = useState(true);
  const [second, setSecond] = useState(0);

  function handleActivity(event) {
    setSecond(0);
    setActive(true);

    // return <p>User is Active</p>;
  }

  window.addEventListener('click', handleActivity);
  window.addEventListener('mousemove', handleActivity);


  useEffect(() => {
    const timer = setInterval(
      () => setSecond((prevValue) => prevValue + 1), interval
    )
    return () => clearInterval(timer);
  }, [interval])


  if (second === 5) {
    setSecond(0);
    setActive(false);
    console.log('asdsadasd');
  }

  return second;
}



function ActiveComponent() {

  const time = useTimer(1000);

  return (
    <div>
      <p>Time: {time}</p>
    </div>
  );
}


function App() {

  return (
    <div>
      <ActiveComponent />
    </div>
  );
}


export default App;
