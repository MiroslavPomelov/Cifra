import { useState } from 'react';
import './App.css';
import SimpleForm from './components/MultiFieldForm/MultiFieldForm';
import FormWithValidation from './components/ValidatedForm/ValidatedForm';

function Notification({ unreadMessages }) {
  return (
    <div>
      <h1>U have {unreadMessages} new messages</h1>
      {unreadMessages > 0 && <p>U have mew messages!</p>}
    </div>
  )
}

function Roles({ role }) {
  return (
    <div>
      <h1>U role {role} </h1>
      {role == 'admin' && <div><p>Welcome admin!</p> <button>Manage users</button> </div>}
      {role == 'user' && <button>Welcome User!</button>}
      {role == 'guest' && <button>Welcome Guest! Pls Log In</button>}
    </div>
  )
}

function App() {
  const [role, setRole] = useState('guest');

  const handleGetRole = () =>
    setRole(!role);

  return (
    <div>
      <Roles role={role} />

      <button>Set new Role</button>
    </div>
  );




  // const [unreadMessages, setUnreadMessages] = useState(3);

  // return (
  //   <div>
  //     <Notification unreadMessages={unreadMessages} />

  //     <button onClick={() => setUnreadMessages(unreadMessages + 1)}>Add new message</button>

  //     <button onClick={() => setUnreadMessages(0)}>
  //       Read message
  //     </button>
  //   </div>

  // <div>
  //   {isLoggedIn ? <h1>Welcome!</h1> : <h1>Please log in</h1>}
  //   <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
  //     {isLoggedIn ? 'Exit' : 'Enter'}
  //     </button>
  // </div>
  // );
}

export default App;
