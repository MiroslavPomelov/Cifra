import './App.css';
import Counter from './components/Counter';
import CustomComponent from './components/CustomComponents';
import DataComponent from './components/DataComponent';
import React from 'react';

function App() {
  return (
    <div>
      {/* <Counter/>
      <DataComponent/> */}
      <CustomComponent/>
    </div>
  );
}

export default App;
