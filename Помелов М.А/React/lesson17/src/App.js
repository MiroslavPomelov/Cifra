import { useEffect, useState } from 'react';
import './App.css';

// function useTimer(interval) {
//   const [seconds, setSeconds] = useState(0);

//   useEffect(
//     () => {
//       const timer = setInterval(() => {
//         setSeconds((prevValue) => prevValue + 1)
//       }, interval)

//       return () => clearInterval(timer);
//     },
//     [interval]
//   )

//   return seconds;
// }

// function TimerComponent() {
//   const seconds = useTimer(1000);

//   return <div>Прошло секунд: {seconds}</div>
// }




function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);

      } catch (error) {
        setError(error);
      }
      finally {
        setLoading(false);
      }
    }
    fetchData()
  }, [url]);

  return { data, loading, error }
}

function DataComponent() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error! {error.message}</p>
  }

  return (
    <div>
      <h1>Data: </h1>

      <ul>
        {
          data.map((item) => (<li key={item.id}>{item.title}</li>))
        }
      </ul>
    </div>
  );
}

function App() {


  return (
    // <div>
    //   <TimerComponent />
    // </div>



    <div>
      <DataComponent />
    </div>
  );
}

export default App;
