import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    const handleLogout = async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
    };

    return (
        <div className="min-h-screen bg-background">
            <Sidebar
                user={{
                    name: session.user?.name,
                    email: session.user?.email,
                }}
                onLogout={handleLogout}
            />

            {/* Main Content */}
            <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
                <div className="p-4 md:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
