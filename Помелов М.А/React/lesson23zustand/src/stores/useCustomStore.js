import { create } from "zustand";

const useCustomStore = create((set) => ({
    data: [],
    fetchDataPost: async () => {
        const post = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await post.json();
        set({data});
    }
}))

export default useCustomStore;