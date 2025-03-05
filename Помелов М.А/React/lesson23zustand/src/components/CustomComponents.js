import React from "react";
import useCustomStore from "../stores/useCustomStore";

function CustomComponent() {
    const data = useCustomStore((state) => state.data);
    const fetchDataPost = useCustomStore((state) => state.fetchDataPost)

    React.useEffect(() => {
        fetchDataPost();
    }, [fetchDataPost]);

    return (
        <div >
            {data.map((post) => (
                <div>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    )
}

export default CustomComponent;