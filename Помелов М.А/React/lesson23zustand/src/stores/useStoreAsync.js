import { create } from "zustand";

const useStoreAsync = create((denis) => ({
    data: null,
    fetchData: async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.text();
        denis({ data });
    }
}))

export default useStoreAsync;