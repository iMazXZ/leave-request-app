import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
    const employeeCount = await prisma.employee.count();
    const leaveRequestCount = await prisma.leaveRequest.count();
    const recentRequests = await prisma.leaveRequest.findMany({
        include: { employee: true },
        orderBy: { createdAt: "desc" },
        take: 5,
    });

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Selamat datang di Sistem Pengajuan Cuti</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Pegawai</CardTitle>
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">{employeeCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">Pegawai terdaftar</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Surat Cuti</CardTitle>
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground">{leaveRequestCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">Surat cuti dibuat</p>
                    </CardContent>
                </Card>

                <Card className="sm:col-span-2 lg:col-span-1 border-primary/20 bg-primary/5">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-primary">Quick Action</CardTitle>
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" x2="12" y1="8" y2="16" />
                                <line x1="8" x2="16" y1="12" y2="12" />
                            </svg>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Link href="/dashboard/request">
                            <Button className="w-full bg-primary hover:bg-primary/90">
                                Buat Surat Cuti Baru
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-foreground">Surat Cuti Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                    {recentRequests.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">Belum ada surat cuti yang dibuat</p>
                    ) : (
                        <div className="space-y-3">
                            {recentRequests.map((request) => (
                                <div
                                    key={request.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors gap-3"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-semibold flex-shrink-0">
                                            {request.employee.name.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium text-foreground truncate">{request.employee.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {request.leaveType} • {request.duration} {request.durationUnit}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:text-right pl-14 sm:pl-0">
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(request.startDate).toLocaleDateString("id-ID")}
                                        </p>
                                        <Link
                                            href={`/api/pdf/${request.id}`}
                                            target="_blank"
                                            className="text-sm text-primary hover:text-primary/80 font-medium"
                                        >
                                            Download PDF
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
