import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function HistoryPage() {
    const requests = await prisma.leaveRequest.findMany({
        include: { employee: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Riwayat Cuti</h1>
                <p className="text-slate-400">Daftar semua surat cuti yang telah dibuat</p>
            </div>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Semua Surat Cuti</CardTitle>
                </CardHeader>
                <CardContent>
                    {requests.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                    <polyline points="14 2 14 8 20 8" />
                                </svg>
                            </div>
                            <p className="text-slate-400 mb-4">Belum ada surat cuti yang dibuat</p>
                            <Link href="/dashboard/request">
                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                                    Buat Surat Cuti Pertama
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/10 hover:bg-white/5">
                                        <TableHead className="text-slate-400">Pegawai</TableHead>
                                        <TableHead className="text-slate-400">Jenis Cuti</TableHead>
                                        <TableHead className="text-slate-400">Durasi</TableHead>
                                        <TableHead className="text-slate-400">Periode</TableHead>
                                        <TableHead className="text-slate-400">Tanggal Dibuat</TableHead>
                                        <TableHead className="text-slate-400 text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {requests.map((request) => (
                                        <TableRow key={request.id} className="border-white/10 hover:bg-white/5">
                                            <TableCell>
                                                <div>
                                                    <p className="text-white font-medium">{request.employee.name}</p>
                                                    <p className="text-xs text-slate-400">{request.employee.nip}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-slate-300">{request.leaveType}</TableCell>
                                            <TableCell className="text-slate-300">
                                                {request.duration} {request.durationUnit}
                                            </TableCell>
                                            <TableCell className="text-slate-300">
                                                {new Date(request.startDate).toLocaleDateString("id-ID")} -{" "}
                                                {new Date(request.endDate).toLocaleDateString("id-ID")}
                                            </TableCell>
                                            <TableCell className="text-slate-300">
                                                {new Date(request.createdAt).toLocaleDateString("id-ID")}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <a
                                                    href={`/api/pdf/${request.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Button
                                                        size="sm"
                                                        className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-600/30"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                            <polyline points="7 10 12 15 17 10" />
                                                            <line x1="12" x2="12" y1="15" y2="3" />
                                                        </svg>
                                                        PDF
                                                    </Button>
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
