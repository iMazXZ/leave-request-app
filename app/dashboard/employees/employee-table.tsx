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
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <line x1="19" x2="19" y1="8" y2="14" />
                        <line x1="22" x2="16" y1="11" y2="11" />
                    </svg>
                </div>
                <p className="text-muted-foreground mb-4">Belum ada data pegawai</p>
                <Link href="/dashboard/employees/new">
                    <Button className="bg-primary hover:bg-primary/90">Tambah Pegawai Pertama</Button>
                </Link>
            </div>
        );
    }

    return (
        <>
            {/* Mobile View - Cards */}
            <div className="md:hidden space-y-4">
                {employees.map((employee) => (
                    <div key={employee.id} className="p-4 bg-muted/50 rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-medium text-foreground">{employee.name}</p>
                                <p className="text-sm text-muted-foreground">{employee.nip}</p>
                            </div>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                {employee.remainingN} hari
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <p className="text-muted-foreground">Jabatan</p>
                                <p className="text-foreground">{employee.position}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Unit Kerja</p>
                                <p className="text-foreground">{employee.workUnit}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                            <Link href={`/dashboard/employees/${employee.id}/edit`} className="flex-1">
                                <Button size="sm" variant="outline" className="w-full">
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 text-destructive hover:bg-destructive/10"
                                onClick={() => handleDelete(employee.id)}
                                disabled={loading === employee.id}
                            >
                                {loading === employee.id ? "..." : "Hapus"}
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
                            <TableHead>Nama</TableHead>
                            <TableHead>NIP</TableHead>
                            <TableHead>Jabatan</TableHead>
                            <TableHead>Unit Kerja</TableHead>
                            <TableHead>Sisa Cuti (N)</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell className="font-medium">{employee.name}</TableCell>
                                <TableCell>{employee.nip}</TableCell>
                                <TableCell>{employee.position}</TableCell>
                                <TableCell>{employee.workUnit}</TableCell>
                                <TableCell>{employee.remainingN} hari</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/dashboard/employees/${employee.id}/edit`}>
                                            <Button size="sm" variant="ghost">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-destructive hover:bg-destructive/10"
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
        </>
    );
}
