import { useRef, useState,forwardRef } from 'react';
import './App.css';


function TextInputWithFocusButton() {
  const inputElement = useRef(null);

  const onButtonClick = () => {
    //Устанавливается фокус на текстовое поле
    inputElement.current.focus();
  }

  return (
    <div>
      <input ref={inputElement} type="text" placeholder='Write text...' />
      <button onClick={onButtonClick}>Установить фокус</button>
    </div>
  );
}



function Counter() {
  let number = 0;
  const countRef = useRef(0);
  const [renderCount, setRenderCount] = useState(0);

  const increment = () => {
    console.log('Component render')
    number++;
    countRef.current++;
    console.log(number);
    console.log(`Value countRef: ${countRef.current}`);
    setRenderCount(renderCount + 1);
  }

  return (
    <div>
      <p>Quantity render: {renderCount}</p>
      <button onClick={increment}>Add count</button>
    </div>
  );
}


const CustomInput = forwardRef((props, ref) => (
  <input ref={ref} type="text" placeholder='Введите текст'/>
))

function ParentComponent() {
  const inputRef = useRef(null);

  const focusInput = () => {
      inputRef.current.focus();
  }

  return (
      <div>
          <CustomInput ref={inputRef}/>
          <button onClick={focusInput}>Установить фокус</button>
      </div>
  )
}




function App() {
  return (
    <div>
      {/* <TextInputWithFocusButton /> */}
      <Counter />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ParentComponent/>
    </div>
  );
}

export default App;
