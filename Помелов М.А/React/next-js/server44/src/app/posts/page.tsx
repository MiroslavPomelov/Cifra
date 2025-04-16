interface Post {
    id: number;
    title: string;
    body: string;
}

export default async function PostsPage() {

    const responseWithCash: Response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        next: {
            revalidate: 60
        }
    });


    //Render with Cache
    const responseByDynamic: Response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        cache: 'no-cache'
    });
    const posts: Post[] = await responseWithCash.json();

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