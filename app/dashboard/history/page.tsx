import { prisma } from "@/lib/prisma";
import { HistoryTable } from "./history-table";

export default async function HistoryPage() {
    const requests = await prisma.leaveRequest.findMany({
        include: { employee: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Riwayat Cuti</h1>
                <p className="text-muted-foreground">Daftar semua surat cuti yang telah dibuat</p>
            </div>

            <HistoryTable requests={requests} />
        </div>
    );
}
