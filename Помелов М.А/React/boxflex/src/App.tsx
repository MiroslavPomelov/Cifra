import { Box, Flex } from '@radix-ui/themes'
import './App.css'

function App() {

  return (
    <>
      <Flex width={'100%'}>

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


      </Flex>

    </>

  )
}

export default App





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
