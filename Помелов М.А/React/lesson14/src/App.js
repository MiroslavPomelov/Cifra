import { createContext, useContext, useState } from 'react';
import './App.css';


const ThemeContext = createContext('light');

const Toolbar = () => {
  const theme = useContext(ThemeContext);

  return (
    <div style={{
      background: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000'
    }
    }>Текущая тема: {theme}</div>
  )
}

const Square = () => {
  const theme = useContext(ThemeContext);

  const style = {
    border: '1px solid black',
    backgroundColor: 'lightGrey',
    width: '100px',
    height: '100px',
    borderRadius: '10px',
    margin: '10px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: "row",
    textAlign: 'center',
    background: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#fff' : '#000',

  }

  return (
    <div style={style}>
      <p>Text 1</p>
    </div>
  )
}



function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheeme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    < ThemeContext.Provider value={theme}>
      <Square />
      <Square />
      <Square />
      <Toolbar />
      <button style={{
        background: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
      }} onClick={toggleTheeme}>Switch Theme</button>
    </ThemeContext.Provider>
  );
}

export default App;
