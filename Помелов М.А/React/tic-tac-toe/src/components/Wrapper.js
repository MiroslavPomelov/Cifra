import React from 'react'

const Wrapper = ({ children }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '100px 100px 100px',
            gap: '30px',
            alignItems: "center",
        }}>{children}</div>
    )
}

export default Wrapper;