import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/user";
import { ProfileForm } from "./profile-form";

export default async function ProfilePage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Edit Profil</h1>
                <p className="text-muted-foreground">Kelola informasi akun dan keamanan Anda</p>
            </div>

            <ProfileForm user={user} />
        </div>
    );
}
