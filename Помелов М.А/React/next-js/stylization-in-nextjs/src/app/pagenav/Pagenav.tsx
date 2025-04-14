import styled from "styled-components";



export default function Pagenav(props: PageNavProps) {
    return (
        <div>
            <button style={{
                width: '200px',
                height: '35px',
                color: 'white',
                borderRadius: "5px",
                backgroundColor: 'lightgray'
            }}>Предыдущая</button>
            <input style={{
                border: '1px solid gray',
                borderRadius: '5px',
                margin: '10px'
            }}></input>
            <button style={{
                  width: '200px',
                  height: '35px',
                  color: 'white',
                  borderRadius: "5px",
                  backgroundColor: 'darkblue'
            }}> Следующая</button>
            <p> Page {} of {props.length}</p>
        </div>
    )
}