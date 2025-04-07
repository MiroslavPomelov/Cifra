import { useMemo, useReducer, useState } from 'react';
import './App.css';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { counter: state.counter + 1 }
    case 'decrement':
      return { counter: state.counter - 1 }
    default:
      return state;
  }
}


function Counter() {
  const initialState = { counter: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>counter: {state.counter}</p>
      <button onClick={() =>dispatch({type: 'increment'})}>Increase</button>
      <button onClick={() =>dispatch({type: 'decrement'})}>Decrease</button>
    </div>
  );
}

function App() {



  return (

    <div>
      <Counter/>
    </div>
  );
}


export default App;






// import React, { useState, useMemo } from 'react';

// const UserList = () => {
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {

//     const request = await fetch("https://jsonplaceholder.typicode.com/users")
//     const data = await request.json();
//     setUsers(data)
//   };

//   const memoized = useMemo(() => {
//     return users
//   }, [users])

//   return (
//     <div>
//       <h1>User List</h1>
//       <button onClick={fetchUsers}> Вернуть список
//       </button>

//       <ul>
//         {memoized.map((user) => (
//           <li key={user.id}>
//             {user.name} ------ ({user.email})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;
