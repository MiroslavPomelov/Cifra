import { ReactNode } from "react";

export default function SidebarLayout({ children }: { children: ReactNode }) {

    return (
        <aside>
            <nav>Side pannel</nav>
            {children}
        </aside>
    );
}