import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUsers } from "@/lib/actions/user";
import { UsersTable } from "./users-table";

export default async function UsersPage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/login");
    }

    const users = await getUsers();

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Kelola Akun</h1>
                <p className="text-muted-foreground">Tambah atau hapus akun admin</p>
            </div>

            <UsersTable users={users} currentUserEmail={session.user.email} />
        </div>
    );
}
