import { Navbar } from "./Navbar";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">{children}</main>
        </div>
    );
};
