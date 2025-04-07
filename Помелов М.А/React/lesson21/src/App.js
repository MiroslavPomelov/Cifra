import { configure } from '@testing-library/dom';
import './App.css';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
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

const counterSliceTask = createSlice({
  name: 'tasks',
  initialState: { task: [] },
  reducers: {
    add: (state, data) => {
      state.task.push(data.payload);
    },
    delete: (state, data) => {
      state.task.slice(data.payload);
    }
  }
})

const storeTask = configureStore({
  reducer: counterSliceTask.reducer
})

function TaskItem(task) {
  const dispatchTask = useDispatch();

  return (
    <div>
      <p>{task.name}</p>
      <p>{task.text}</p>
      <input type="checkbox" />

      <button onClick={() => dispatch(dispatchTask())}>Delete Task</button>
    </div>
  )
}

function TaskList() {

  const [text, setText] = useState();

  const [id, setId] = useState();

  const [taskList, setTaskList] = useState([
    { id: 0, name: 'first', text: 'aaaaaaaaaaaa', check: false },
    { id: 1, name: 'second', text: 'bbbbbbbbbbbb', check: false },
    { id: 2, name: 'third', text: 'cccccccccc', check: false },
  ]);



  return (
    <ul {...taskList.map((task) => {
      <li key={task.id}>
        <TaskItem task={task}/>
      </li>
    })}>

    </ul>
  )
}

// Функции для изменения состояния
export const { incremet, decrement } = counterSlice.actions;


const store = configureStore({
  reducer: counterSlice.reducer
})

function TaskForm() {


  return (
    <>
      <form>
        <input type="text" />
        <button type='submit' onClick={(event) => {event.preventDefault()}}>Add Task</button>
      </form>
    </>


  )
}




function App() {


  return (
    // <Provider store={store}>
    //   <Counter />
    // </Provider>


    <Provider store={storeTask}>
      <TaskList />
    </Provider>
  );
}

export default App;
