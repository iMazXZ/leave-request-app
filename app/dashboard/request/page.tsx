import { LeaveRequestForm } from "./leave-request-form";
import { prisma } from "@/lib/prisma";

export default async function LeaveRequestPage() {
    const employees = await prisma.employee.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Buat Surat Cuti</h1>
                <p className="text-slate-400">
                    Formulir Permintaan dan Pemberian Cuti
                </p>
            </div>

            <LeaveRequestForm employees={employees} />
        </div>
    );
}
