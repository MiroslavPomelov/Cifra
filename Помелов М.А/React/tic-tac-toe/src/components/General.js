import React from 'react'

const General = ({ children }) => {
    return (
        <div style={{
            padding: '15px',
            border: 'none',
            borderRadius: '10px',
            backgroundColor: 'whiteSmoke',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
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