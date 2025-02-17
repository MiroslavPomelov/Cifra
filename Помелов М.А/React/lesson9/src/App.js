
import './App.css';
import MyClassComponent from './classComponents/MyClassComponent';
import MyFriensComponent from './components/MyFriensComponent';

function App() {
  // const fruits = [
  //   { id: 1, name: 'apple' },
  //   { id: 2, name: 'pineapple' },
  //   { id: 3, name: 'pear' },
  //   { id: 4, name: 'kiwi' },
  //   { id: 5, name: 'orange' },
  // ];

  return (
    // <ul>
    //   {
    //     // fruits.map((value, index) => (<li key={index}>{value}</li>));
    //     fruits.map((fruit) => (<li key={fruit.id}>{fruit.name}</li>))
    //   }
    // </ul>

    <div>
      <MyFriensComponent />
    </div>
  );
}

export default App;