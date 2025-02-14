import React from 'react'

const General = ({ children }) => {
    return (
        <div style={{
            border: '1px solid black',
            borderRadius: '10px',
            backgroundColor: 'whiteSmoke',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
            fontFamily: 'sans-serif',
            fontSize: '25px',
            color: 'darked',
            boxShadow: '5px 5px 5px 5px grey'
        }}>Крестики - Нолики
            <p style={{
                fontSize: '16px',
            }}>Текущий игрок: { }</p>
            <div>
                {children}
            </div>
        </div>
    )
}

export default General;