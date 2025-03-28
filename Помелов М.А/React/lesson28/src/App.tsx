import { useState } from 'react'
import './App.css'



import GameGrid from './components/GameGrid'


function App() {

  const [isAactiveCellChordXctive, setActiveCellChordX] = useState(6);
  const [isAactiveCellChordYctive, setActiveCellChordY] = useState(6);



  return (
    <>
      <GameGrid activeCellChordX={isAactiveCellChordXctive} activeCellChordY={isAactiveCellChordYctive}>

      </GameGrid>
    </>
  )
}

export default App
