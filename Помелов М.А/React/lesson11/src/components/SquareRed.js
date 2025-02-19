import React from 'react'

const SquareRed = () => {
    const styleRed = {
        border: '1px solid black', 
        backgroundColor: 'red', 
        width: '100px',
        height: '100px',
        borderRadius: '10px',
        margin: '10px'
    }

  return (
    <div style={styleRed}></div>
  )
}

export default SquareRed;