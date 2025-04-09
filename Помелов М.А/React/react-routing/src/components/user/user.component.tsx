import { ReactNode } from "react";
import { useParams } from "react-router-dom";

function User(): ReactNode {
    const { id } = useParams();

    return (
        <h1>ID user: {id}</h1>
    )
}


export default User;