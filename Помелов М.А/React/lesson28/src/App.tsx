import { KeyboardEvent, useState } from 'react'
import './App.css'



import GameGrid from './components/GameGrid'
import EventType from './types/EventType.type';


function App() {

  const [isAactiveCellChordXctive, setActiveCellChordX] = useState(6);
  const [isAactiveCellChordYctive, setActiveCellChordY] = useState(6);

  const handleButtonPressing = (event: EventType) => {
    if (event.key == 'ArrowUp') {
      setActiveCellChordY(isAactiveCellChordYctive - 1);
    }
  }


  return (
    <>
      <div tabIndex={0} onKeyDown={handleButtonPressing }>
        <GameGrid activeCellChordX={isAactiveCellChordXctive} activeCellChordY={isAactiveCellChordYctive}>

        </GameGrid>
      </div>
    </>
  )
}

export default App
