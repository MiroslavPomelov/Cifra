"use client"

import { useState } from "react";

interface CommentResponse {
    message: string;
}

async function postComment(comment: string): Promise<CommentResponse> {
    const response: Response = await fetch("/api/comment", {
        method: 'Post',
        body: JSON.stringify({ comment }),
        headers: {
            'Content-Type': 'apllication/json'
        }
    });

    if (!response.ok) {
        throw new Error('Unhandled exception: this error occured while sendind comment');
    }

    return response.json();
}

export default function CommentPage() {
    const [comment, setComment] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const result = await postComment(comment);
            console.log('Comment has been posted succesfully!', result.message);
            setComment('');
        } catch (error) {
            console.log('Error', error)
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={comment}
                    placeholder="Enter ur comment"
                    onChange={(e) => setComment(e.target.value)} />


                <button type="submit">Send</button>
            </form>
        </div>
    );
}