import { blue, gray } from '@radix-ui/colors'
import './App.css'
import "@radix-ui/themes/styles.css";
import { Box } from '@radix-ui/themes';
import { CSSProperties } from 'react';

const isDarkMode = true;

function App() {
  const styles: CSSProperties = {
    width: '200px',
    height: '200px',
    backgroundColor: isDarkMode ? gray.gray10 : gray.gray4
  }

  return (
    <>
      <Box style={styles} />
    </>

  )
}

export default App
