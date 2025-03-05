import useStoreAsync from "../stores/useStoreAsync";
import React from 'react';

function DataComponent() {
    const data = useStoreAsync((state) => state.data);
    const fetchData = useStoreAsync((state) => state.fetchData);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            Data: {data}
        </div>
    )
}

export default DataComponent;