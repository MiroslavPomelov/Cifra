
// import { useMemo, useState } from 'react';
// import './App.css';

// let users = [];

// const jsonPlaceHolder = async () => {
//   console.log('Requesting');

//   users = await fetch('https://jsonplaceholder.typicode.com/users');
//   return await users.json();
// }



// function App() {
//   const [counter, setCounter] = useState(0);
//   const [text, setText] = useState('');

//   // Дорогостоящая функция
//   const computeExpensuveValue = (num) => {
//     console.log('Computing...');
//     return num * 2;
//   }

//   const expensiveValue = useMemo(() => {
//     return computeExpensuveValue(counter);
//   }, [counter]);

//   const apiValue = useMemo(() => {
//     return jsonPlaceHolder();
//   }, []);

//   const reload = () => {
//     setText(apiValue);
//   }


//   return (

//     <div>
//       <ul>
//         {users.map((user) => {
//           <li key={user.id}>{user.name}</li>
//         })}
//       </ul>

//       <button onClick={reload}>Go</button>
//     </div>
//   );
// }


// export default App;






import React, { useState, useMemo } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {

    const request = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await request.json();
    setUsers(data)
  };

  const memoized = useMemo(() => {
    return users
  }, [users])

  return (
    <div>
      <h1>User List</h1>
      <button onClick={fetchUsers}> Вернуть список
      </button>

      <ul>
        {memoized.map((user) => (
          <li key={user.id}>
            {user.name} ------ ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
