import { getSigningOfficials } from "@/lib/actions/signing-official";
import { SigningOfficialsTable } from "./signing-officials-table";

export default async function SigningOfficialsPage() {
    const officials = await getSigningOfficials();

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Daftar Pejabat</h1>
                <p className="text-muted-foreground">
                    Kelola pejabat yang berwenang memberikan cuti
                </p>
            </div>

            <SigningOfficialsTable officials={officials} />
        </div>
    );
}
