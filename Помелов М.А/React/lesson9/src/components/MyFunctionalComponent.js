import { useEffect, useState } from "react";

function MyFunctionalComponent() {
    cons [count, setCount] = useState(0);

    useEffect(() => {
        console.log('Component has been Mounted succesfully!');

        return () => (
            console.log('Component has been Umounted succesfully!')
        )
    }); 
}

