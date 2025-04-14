'use client';
import Button from "../components/button";

export default function HomePage() {
    return (
        <div>
            <h1>Welcome on home page!</h1>
            <Button text="Click me!" onClick={() => alert('Button has been pressed!')} />
        </div>
    )
}