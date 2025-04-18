import { ReactNode } from "react";

export default function DashboardLayout(
    {
        children, //Основной контент из page
        sidebar // Контент боковой панели
    }: {
        children: ReactNode,
        sidebar: ReactNode,
    }
) {

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 3 }}>{children}</div>
            <div style={{ flex: 1 }}>{sidebar}</div>
        </div>
    );
}