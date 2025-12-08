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
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-slate-400">Selamat datang di Sistem Pengajuan Cuti</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Total Pegawai</CardTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">{employeeCount}</div>
                        <p className="text-xs text-slate-500 mt-1">Pegawai terdaftar</p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Total Surat Cuti</CardTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">{leaveRequestCount}</div>
                        <p className="text-xs text-slate-500 mt-1">Surat cuti dibuat</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl border-blue-500/30 hover:border-blue-500/50 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-blue-300">Quick Action</CardTitle>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" x2="12" y1="8" y2="16" />
                            <line x1="8" x2="16" y1="12" y2="12" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <Link href="/dashboard/request">
                            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                Buat Surat Cuti Baru
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Surat Cuti Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                    {recentRequests.length === 0 ? (
                        <p className="text-slate-400 text-center py-8">Belum ada surat cuti yang dibuat</p>
                    ) : (
                        <div className="space-y-4">
                            {recentRequests.map((request) => (
                                <div
                                    key={request.id}
                                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold">
                                            {request.employee.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{request.employee.name}</p>
                                            <p className="text-sm text-slate-400">
                                                {request.leaveType} • {request.duration} {request.durationUnit}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-400">
                                            {new Date(request.startDate).toLocaleDateString("id-ID")}
                                        </p>
                                        <Link
                                            href={`/api/pdf/${request.id}`}
                                            target="_blank"
                                            className="text-sm text-blue-400 hover:text-blue-300"
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
