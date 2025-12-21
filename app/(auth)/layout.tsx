import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-1 flex items-center justify-center p-4">
                {children}
            </main>
        </div>
    );
}
