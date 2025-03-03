import { configure } from '@testing-library/dom';
import './App.css';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Counter from './components/Counter';
import { useState } from 'react';

// Состояние
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    incremet: (state) => { state.count += 1 },
    decrement: (state) => { state.count -= 1 },
  }
})

function TaskList() {
  const [text, setText] = useState();

  const [id, setId] =useState();

  const [taskList, setTaskList] = useState({
    
  })
}

// Функции для изменения состояния
export const { incremet, decrement } = counterSlice.actions;


const store = configureStore({
  reducer: counterSlice.reducer
})


function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;
