"use client"
import useSWR from 'swr';

interface Post {
    id: number;
    title: string;
    body: string;
}

const fetcher: (url: string) => Promise<Post[]> = (url: string) => fetch(url)
    .then((res: Response) => res.json());

export default function Posts() {
    const { data, error } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher);

    if (error) {
        return (
            <div>Request Error!</div>
        );
    }

    if (!data) {
        return (
            <div>Downloading...</div>
        );
    }

    return (
        <div className="text-center">
            <h1>Posts</h1>

            <ul>
                {data.map((post: Post, index: number) => (
                    <li key={index}>
                        <h2>{post.title}</h2>

                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}