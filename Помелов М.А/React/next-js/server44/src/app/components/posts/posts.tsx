"use client"

import { useEffect, useState } from "react";

interface Post {
    id: number;
    title: string;
    body: string;
}

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const response: Response = await fetch('https://jsonplaceholder.typicode.com/posts');

            const data: Post[] = await response.json();

            setPosts(data);
            setLoading(false);
        }

        fetchPosts();
    }, []);



    if (loading) {
        return (
            <div>
                Loadding...
            </div>
        )
    };

    return (
        <div className="text-center">
            <h1>Posts</h1>

            <ul>
                {posts.map((post: Post, index: number) => (
                    <li key={index}>
                        <h2>{post.title}</h2>

                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}