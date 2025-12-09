"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteLeaveRequest } from "@/lib/actions/leave-request";

interface LeaveRequest {
    id: number;
    leaveType: string;
    duration: number;
    durationUnit: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    employee: {
        name: string;
        nip: string;
    };
}

export function HistoryTable({ requests: initialRequests }: { requests: LeaveRequest[] }) {
    const [requests, setRequests] = useState(initialRequests);
    const [deleting, setDeleting] = useState<number | null>(null);

    const handleDelete = async (id: number, employeeName: string) => {
        if (!confirm(`Yakin ingin menghapus surat cuti ${employeeName}?`)) return;

        setDeleting(id);
        try {
            await deleteLeaveRequest(id);
            setRequests(requests.filter(r => r.id !== id));
        } catch (error) {
            alert("Gagal menghapus surat cuti");
        } finally {
            setDeleting(null);
        }
    };

    if (requests.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-foreground">Semua Surat Cuti</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                        </div>
                        <p className="text-muted-foreground mb-4">Belum ada surat cuti yang dibuat</p>
                        <Link href="/dashboard/request">
                            <Button className="bg-primary hover:bg-primary/90">
                                Buat Surat Cuti Pertama
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-foreground">Semua Surat Cuti</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Mobile View - Cards */}
                <div className="md:hidden space-y-4">
                    {requests.map((request) => (
                        <div key={request.id} className="p-4 bg-muted/50 rounded-lg space-y-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-medium text-foreground">{request.employee.name}</p>
                                    <p className="text-sm text-muted-foreground">{request.employee.nip}</p>
                                </div>
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                    {request.leaveType}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Durasi</p>
                                    <p className="text-foreground">{request.duration} {request.durationUnit}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Periode</p>
                                    <p className="text-foreground">
                                        {new Date(request.startDate).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })} - {new Date(request.endDate).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Link href={`/dashboard/history/${request.id}/edit`} className="flex-1">
                                    <Button size="sm" variant="outline" className="w-full">
                                        Edit
                                    </Button>
                                </Link>
                                <a href={`/api/pdf/${request.id}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                                        PDF
                                    </Button>
                                </a>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-destructive hover:bg-destructive/10"
                                    onClick={() => handleDelete(request.id, request.employee.name)}
                                    disabled={deleting === request.id}
                                >
                                    {deleting === request.id ? "..." : "Hapus"}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop View - Table */}
                <div className="hidden md:block overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Pegawai</TableHead>
                                <TableHead>Jenis Cuti</TableHead>
                                <TableHead>Durasi</TableHead>
                                <TableHead>Periode</TableHead>
                                <TableHead>Tanggal Dibuat</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium text-foreground">{request.employee.name}</p>
                                            <p className="text-xs text-muted-foreground">{request.employee.nip}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{request.leaveType}</TableCell>
                                    <TableCell>
                                        {request.duration} {request.durationUnit}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(request.startDate).toLocaleDateString("id-ID")} -{" "}
                                        {new Date(request.endDate).toLocaleDateString("id-ID")}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(request.createdAt).toLocaleDateString("id-ID")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/dashboard/history/${request.id}/edit`}>
                                                <Button size="sm" variant="outline">
                                                    Edit
                                                </Button>
                                            </Link>
                                            <a
                                                href={`/api/pdf/${request.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Button size="sm" className="bg-primary hover:bg-primary/90">
                                                    PDF
                                                </Button>
                                            </a>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-destructive hover:bg-destructive/10"
                                                onClick={() => handleDelete(request.id, request.employee.name)}
                                                disabled={deleting === request.id}
                                            >
                                                {deleting === request.id ? "..." : "Hapus"}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
