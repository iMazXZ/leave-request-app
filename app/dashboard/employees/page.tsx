import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EmployeeTable } from "./employee-table";

export default async function EmployeesPage() {
    const employees = await prisma.employee.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Master Data Pegawai</h1>
                    <p className="text-muted-foreground">Kelola data pegawai untuk pengajuan cuti</p>
                </div>
                <Link href="/dashboard/employees/new">
                    <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" x2="12" y1="8" y2="16" />
                            <line x1="8" x2="16" y1="12" y2="12" />
                        </svg>
                        Tambah Pegawai
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-foreground">Daftar Pegawai</CardTitle>
                </CardHeader>
                <CardContent>
                    <EmployeeTable employees={employees} />
                </CardContent>
            </Card>
        </div>
    );
}
