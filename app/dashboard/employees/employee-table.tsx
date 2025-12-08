"use client";

import { Employee } from "@prisma/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteEmployee } from "@/lib/actions/employee";
import { useState } from "react";

export function EmployeeTable({ employees }: { employees: Employee[] }) {
    const [loading, setLoading] = useState<number | null>(null);

    const handleDelete = async (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus pegawai ini?")) return;
        setLoading(id);
        await deleteEmployee(id);
        setLoading(null);
    };

    if (employees.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <line x1="19" x2="19" y1="8" y2="14" />
                        <line x1="22" x2="16" y1="11" y2="11" />
                    </svg>
                </div>
                <p className="text-slate-400 mb-4">Belum ada data pegawai</p>
                <Link href="/dashboard/employees/new">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Tambah Pegawai Pertama</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-slate-400">Nama</TableHead>
                        <TableHead className="text-slate-400">NIP</TableHead>
                        <TableHead className="text-slate-400">Jabatan</TableHead>
                        <TableHead className="text-slate-400">Unit Kerja</TableHead>
                        <TableHead className="text-slate-400">Sisa Cuti (N)</TableHead>
                        <TableHead className="text-slate-400 text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow key={employee.id} className="border-white/10 hover:bg-white/5">
                            <TableCell className="text-white font-medium">{employee.name}</TableCell>
                            <TableCell className="text-slate-300">{employee.nip}</TableCell>
                            <TableCell className="text-slate-300">{employee.position}</TableCell>
                            <TableCell className="text-slate-300">{employee.workUnit}</TableCell>
                            <TableCell className="text-slate-300">{employee.remainingN} hari</TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Link href={`/dashboard/employees/${employee.id}/edit`}>
                                        <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                        onClick={() => handleDelete(employee.id)}
                                        disabled={loading === employee.id}
                                    >
                                        {loading === employee.id ? "..." : "Hapus"}
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
