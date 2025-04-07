import General from './components/General';
import './App.css';
import Quarter from './components/Quarter';
import Wrapper from './components/Wrapper';
import Button from './components/Button';

function App() {
  return (
    <div className='App-header'>
      <General>
        <Wrapper>
          <Quarter />
          <Quarter />
          <Quarter />
          <Quarter />
          <Quarter />
          <Quarter />
          <Quarter />
          <Quarter />
          <Quarter />
        </Wrapper>

        <Button/>
      </General>
    </div>
  );
}

export default App;
