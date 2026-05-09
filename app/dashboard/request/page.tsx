import { LeaveRequestForm } from "./leave-request-form";
import { prisma } from "@/lib/prisma";

export default async function LeaveRequestPage({
    searchParams,
}: {
    searchParams: Promise<{ employeeId?: string }>;
}) {
    const { employeeId } = await searchParams;

    const [employees, signingOfficials] = await Promise.all([
        prisma.employee.findMany({
            orderBy: { name: "asc" },
        }),
        prisma.signingOfficial.findMany({
            orderBy: { createdAt: "desc" },
        }),
    ]);

    // Find preselected employee if ID is provided
    const preselectedEmployee = employeeId
        ? employees.find(emp => emp.id === parseInt(employeeId))
        : null;

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Buat Surat Cuti</h1>
                <p className="text-muted-foreground">
                    Formulir Permintaan dan Pemberian Cuti
                </p>
            </div>

            <LeaveRequestForm
                employees={employees}
                signingOfficials={signingOfficials}
                preselectedEmployee={preselectedEmployee}
            />
        </div>
    );
}
