import styled from "styled-components";

const Button = styled.button`
background-color: #4b0082;
color: white;
padding: 10px 20px;
border: none;
border-radius: 5px;
cursor:pointer;
width: 320px;
font-weight: bold;
box-shadow: 2px 2px 2px 2px lightgray;

&:hover {
background-color: #6a1b9a;
}
`;

export default Button;