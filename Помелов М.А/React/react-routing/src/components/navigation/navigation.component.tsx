import { ReactNode } from "react";
import { Link } from "react-router-dom";

function Navigation(): ReactNode {
    return (
        <nav>
            <Link to={'/'}>Head</Link>
            <Link to={'/about'}>About us</Link>
            <Link to={'/user/55'}>User with id</Link>
        </nav>
    )
}


export default Navigation;