import { Box, Container, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import './App.css'

function App() {
  const defaultBoxStyle: Object = {
    with: '50%',
    backgroundColor: '#a1f9ff',
    textAlign: 'center'
  }

  return (
    <>
      <Container
        size={'1'}
        mx={'auto'}
        px={'6'}
        py={'4'}>

        <Heading size={'5'} align={'center'} as='h1'>
          Header page
        </Heading>

        <Text size={'5'} align={'center'} as='p'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti quaerat molestias tempora velit nulla cumque neque corrupti distinctio reiciendis nostrum soluta ratione consectetur accusamus, dicta perferendis cum necessitatibus eaque reprehenderit commodi quasi maxime animi. Expedita quae dolore tempore laboriosam iusto est ipsum, itaque, reprehenderit tempora nisi deleniti assumenda cupiditate amet?
        </Text>

      </Container>
    </>

  )
}

export default App







// <Grid align={'center'} gapY={'20px'} columns={'4'} style={{
//   justifyItems: 'center'
// }} >
//   <Box p="20px" style={defaultBoxStyle}>Item 1</Box>
//   <Box p="20px" style={defaultBoxStyle}>Item 2</Box>
//   <Box p="20px" style={defaultBoxStyle}>Item 3</Box>
//   <Box p="20px" style={defaultBoxStyle}>Item 4</Box>
//   <Box p="20px" style={defaultBoxStyle}>Item 5</Box>
//   <Box p="20px" style={defaultBoxStyle}>Item 6</Box>
//   <Box p="20px" style={defaultBoxStyle}>Item 7</Box>
//   <Box p="20px" style={defaultBoxStyle}>Item 8</Box>
//   <Box p="20px" style={defaultBoxStyle}>Item 9</Box>
// </Grid>



{/* <Flex style={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: 'lightgray',
  borderRadius: '10px'
}}>
  <div>Element 1</div>
  <div>Element 2</div>
  <div>Element 3</div>
</Flex> */}


{/* <Box style={{
        backgroundColor: 'lightblue',
        padding: '20px',
        borderRadius: '10px'
      }}>
        This is styled box component through inline-style
      </Box>

      <Box className='custom-box'>
        This is styled box component through css
      </Box> */}






//   <Flex gap='3px' align='center' direction='column' >
//   <Box width='75px' height='75px' style={{
//     backgroundColor: 'green',
//     borderRadius: '10px'
//   }} />
//   <Box width='75px' height='75px' style={{
//     backgroundColor: 'green',
//     borderRadius: '10px'
//   }} />
//   <Box width='75px' height='75px' style={{
//     backgroundColor: 'green',
//     borderRadius: '10px'
//   }} />
//   <Box width='75px' height='75px' style={{
//     backgroundColor: 'green',
//     borderRadius: '10px'
//   }} />

// </Flex>



























{/* <Flex width={'100%'}>

<Box width='600px' height='800px' style={{
  backgroundColor: 'lightblue',
  borderRadius: '10px'
}}> How improve programming skills
  <Flex justify='center' direction={'column'} align={'center'}>

    <Box width={'85%'}>
      <img style={{ borderRadius: '10px' }} src="public\photo-1742238346056-c73aa0fca41f.avif" alt="#" />
    </Box>

    <Box>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia totam quas eligendi autem, libero molestiae nam corporis saepe. Tempore qui fugiat fugit dolore dicta ea debitis ad error iusto inventore eos aut animi recusandae corporis, doloremque rerum voluptates totam blanditiis porro. Voluptatem nemo iste nulla sunt, aperiam eligendi vel neque aut tempore repellat magnam libero ab similique est obcaecati sit id recusandae harum deleniti ipsam facere commodi fugiat. Earum omnis nulla, cupiditate sapiente inventore harum eos dicta illo aliquam impedit consectetur corporis voluptate vel sunt molestiae autem repellendus optio ipsum vitae, dolorum amet, quos hic temporibus doloribus. Quis, repellat nobis.
    </Box>
  </Flex>



</Box >
<Flex width={'15%'}>
  <Box width='200px' height='800px' style={{
    backgroundColor: 'wheat',
    borderRadius: '10px'
  }}>

  </Box>
</Flex>


</Flex> */}

