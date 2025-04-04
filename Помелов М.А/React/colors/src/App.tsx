import { blue, gray, green, red } from '@radix-ui/colors'
import './App.css'
import "@radix-ui/themes/styles.css";
import { Box, Button, Grid, Heading, Text } from '@radix-ui/themes';
import { CSSProperties } from 'react';

function App() {
  const grayPalete = {
    lightGray: gray.gray4,
    middleGray: gray.gray8,
    darkGray: gray.gray11,
  }

  const bluePalete = {
    lightBlue: blue.blue4,
    middleBlue: blue.blue8,
    darkBlue: blue.blue11,
  }

  const greenPalete = {
    lightGreen: green.green5,
    middleGreen: green.green8,
    darkGreen: green.green11,
  }

  const redPalete = {
    lightGreen: red.red4,
    middleGreen: green.green8,
    darkGreen: green.green11,
  }

  const dafaultStyles: CSSProperties = {
    width: '400px',
    height: '400px',
    borderRadius: '10px',
    border: `2px solid ${grayPalete.darkGray}`,
    margin: '10px',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    padding: '0px 20px',
    alignItems: 'center',
    textAlign: 'center'
  }


  const defaultButtonStyle: CSSProperties = {
    width: '350px',
    border: `2px solid ${grayPalete.darkGray}`,
    height: '40px'
  }

  return (
    <>
    <Grid gap={'2'} columns={'2'}>

  
      <Box style={{
        ...dafaultStyles,
        ...{ backgroundColor: grayPalete.middleGray }
      }}>

        <Heading as='h1'>
          Gray Block
        </Heading>

        <Text as='p'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore ducimus quis nisi ea, esse exercitationem.</Text>

        <Button style={{
          ...defaultButtonStyle,
          ...{backgroundColor: grayPalete.darkGray}
          }}>About</Button>

      </Box>


      <Box style={{
        ...dafaultStyles,
        ...{ backgroundColor: bluePalete.middleBlue }
      }}>

        <Heading as='h1'>
          Blue Block
        </Heading>

        <Text as='p'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore ducimus quis nisi ea, esse exercitationem.</Text>

        <Button style={{
          ...defaultButtonStyle,
          ...{backgroundColor: bluePalete.darkBlue}
          }}>About</Button>


      </Box>


      <Box style={{
        ...dafaultStyles,
        ...{ backgroundColor: greenPalete.lightGreen }
      }}>

        <Heading as='h1'>
          Green Block
        </Heading>

        <Text as='p'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore ducimus quis nisi ea, esse exercitationem.</Text>

        <Button style={{
          ...defaultButtonStyle,
          ...{backgroundColor: greenPalete.middleGreen}
          }}>About</Button>


      </Box>

      </Grid>
    </>

  )
}

export default App
