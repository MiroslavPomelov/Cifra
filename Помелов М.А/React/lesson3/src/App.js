// import './styles/App.css';
// import styles from './styles/App.module.css';
import { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import DOMPurify from 'dompurify';

// const Header = styled.header`
//     background-color: #282c34;
//     color: white;
//     text-align: center;
//     padding: 20px;
//     `;





// const Button = styled.button`
//     padding: 10px 20px;
//     background-color: ${(props) => props.theme.primaryColor};
//     color: ${(props) => props.theme.textColor};
//     border: none;
//     border-radius: 10px;
//     cursor: pointer;
//     transition: background-color 1s ease;

//     &:hover {
//     background-color: ${(props) => props.theme.hoverColor};

//     `;

// const lightTheme = {
//   primaryColor: '#61dafb',
//   textColor: '#000',
//   hoverColor: '#35c0f6',
// }

// const darkTheme = {
//   primaryColor: '#000',
//   textColor: '#fff',
//   hoverColor: '#1a8fd1',
// }

// const GlobalStyle = createGlobalStyle`
// body {
// margin: 0;
// padding: 0;
// font-family: 'Arial', sans-serif;
// background-color: #f5f5f5;
// }
// `;


const message = '<p>Это <strong>ВАЖНОЕ</strong> сообщение</p>';



function App() {
  const [listData, setListData] = useState([]);
  const [inputData, setinputData] = useState('');


  const go = (event) => {
    setinputData(event.target.value);
  }



  // const headerStyle = {
  //   backgroundColor: '#282c34',
  //   color: 'white',
  //   textAlign: 'center',
  //   padding: '20px'
  // }

  // const buttonStyle = {
  //   padding: '10px 20px',
  //   fontSize: '16px',
  //   backgroundColor: 'lightcoral',
  //   color: 'white',
  //   border: 'none',
  //   borderRadius: '10px',
  //   cursor: 'pointer'
  // }




  // const [theme, setTheme] = useState(lightTheme);

  // const toggleTheme = () => {
  //   setTheme(theme === lightTheme ? darkTheme : lightTheme);
  // }
 


  // const [content, setContent] = useState(message);

  // const dirtyMessage = '<p><script>alert("АПАСНЫЙ КОД!!!!");</script>Сообщение было измененно!фыв</p>';
  // const clearMessage = DOMPurify.sanitize(dirtyMessage, {
  //   ALLOWED_TAGS: ['b', 'i', 'strong', 'p'],
  //   RETURN_DOM: true, // возвращает не строку а html
  //   KEEP_CONTENT: true // Просто получу текст
  // });



  return (
    // <div>
    //   <Header>
    //     <h1>Hello React App</h1>
    //     <Button >Push me</Button>
    //   </Header>
    // </div>



    // <>
    // <GlobalStyle/>
    // <div>My App</div>
    // </>



    // <ThemeProvider theme={theme}>
    //   <div style={{textAlign: 'center', marginTop: '50px'}}>
    //    <Button onClick={toggleTheme}>
    //     Change Theme
    //     </Button>
    //   </div>
    // </ThemeProvider>


    // <div>
    //   <h1>Сообщение:</h1>

    //   <div dangerouslySetInnerHTML={{ __html: content }} />
    //   <button onClick={() => { setContent(clearMessage) }}>
    //     Изменить
    //   </button>
    // </div>


    <div>
      <h1>Пример динамического добавления</h1>

      <input onChange={go} type="text" placeholder='Name of fruits' />
      <input onChange={go} type="text" placeholder='Sort of fruits' />

      <div>
        {listData.map((sort, name) => <p>Name:{name} Sort:{sort}</p>)}
      </div>

      <button onClick={() => {
        setListData([...listData, inputData])
      }}>Добавить фрукт</button>
    </div>
  );

}

export default App;
