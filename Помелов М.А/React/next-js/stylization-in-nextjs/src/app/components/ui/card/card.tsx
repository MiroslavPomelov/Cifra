import styled from "styled-components";

const Card = styled.div`
background-color:rgb(255, 255, 255);
color: black;
border: 1px solid purple;
border-radius: 10px;
cursor:pointer;
width: 400px;
height: 500px;
display: flex;
justify-content: space-evenly;
flex-direction: column;
padding: 10px 20px;
align-items: center;
margin: 15px;
box-shadow: 4px 4px 4px 4px lightgray;

&:hover {
background-color:rgb(230, 230, 230);
}
`;

export default Card;