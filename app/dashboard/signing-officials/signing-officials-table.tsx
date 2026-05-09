"use client";

import { useState } from "react";
import { SigningOfficial } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createSigningOfficial, deleteSigningOfficial } from "@/lib/actions/signing-official";

export function SigningOfficialsTable({ officials: initialOfficials }: { officials: SigningOfficial[] }) {
    const [officials, setOfficials] = useState(initialOfficials);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleAddOfficial = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const formData = new FormData(e.currentTarget);
            await createSigningOfficial(formData);
            setMessage({ type: "success", text: "Data pejabat berhasil ditambahkan" });
            setShowAddForm(false);
            window.location.reload();
        } catch (error) {
            setMessage({
                type: "error",
                text: error instanceof Error ? error.message : "Gagal menambahkan data pejabat",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, name: string) => {
        if (!confirm(`Yakin ingin menghapus pejabat ${name}?`)) return;

        setDeleteLoading(id);
        setMessage(null);

        try {
            await deleteSigningOfficial(id);
            setOfficials(officials.filter((official) => official.id !== id));
            setMessage({ type: "success", text: "Data pejabat berhasil dihapus" });
        } catch (error) {
            setMessage({
                type: "error",
                text: error instanceof Error ? error.message : "Gagal menghapus data pejabat",
            });
        } finally {
            setDeleteLoading(null);
        }
    };

    return (
        <div className="space-y-6">
            {message && (
                <div className={`p-4 rounded-lg ${message.type === "success" ? "bg-green-500/10 text-green-600 border border-green-500/20" : "bg-destructive/10 text-destructive border border-destructive/20"}`}>
                    {message.text}
                </div>
            )}

            <div className="flex justify-end">
                <Button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-primary hover:bg-primary/90"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" x2="12" y1="8" y2="16" />
                        <line x1="8" x2="16" y1="12" y2="12" />
                    </svg>
                    Tambah Pejabat
                </Button>
            </div>

            {showAddForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>Tambah Pejabat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddOfficial} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Nama Lengkap Pejabat</Label>
                                    <Input
                                        name="fullName"
                                        required
                                        placeholder="Nama lengkap beserta gelar"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Nama pada Surat</Label>
                                    <Input
                                        name="name"
                                        required
                                        placeholder="Contoh: SASTRA IRAWAN"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>NIP</Label>
                                    <Input
                                        name="nip"
                                        required
                                        placeholder="Nomor Induk Pegawai"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Jabatan</Label>
                                    <Input
                                        name="position"
                                        required
                                        placeholder="Jabatan pejabat"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="button" variant="ghost" onClick={() => setShowAddForm(false)}>
                                    Batal
                                </Button>
                                <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90">
                                    {loading ? "Menyimpan..." : "Simpan"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Pejabat</CardTitle>
                </CardHeader>
                <CardContent>
                    {officials.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">Belum ada data pejabat</p>
                    ) : (
                        <>
                            <div className="md:hidden space-y-4">
                                {officials.map((official) => (
                                    <div key={official.id} className="p-4 bg-muted/50 rounded-lg space-y-3">
                                        <div>
                                            <p className="font-medium text-foreground">{official.fullName}</p>
                                            <p className="text-sm text-muted-foreground">{official.name}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <p className="text-muted-foreground">NIP</p>
                                                <p className="text-foreground">{official.nip}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Jabatan</p>
                                                <p className="text-foreground">{official.position}</p>
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-destructive hover:bg-destructive/10"
                                            onClick={() => handleDelete(official.id, official.fullName)}
                                            disabled={deleteLoading === official.id}
                                        >
                                            {deleteLoading === official.id ? "..." : "Hapus"}
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            <div className="hidden md:block overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nama Lengkap</TableHead>
                                            <TableHead>Nama Surat</TableHead>
                                            <TableHead>NIP</TableHead>
                                            <TableHead>Jabatan</TableHead>
                                            <TableHead className="text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {officials.map((official) => (
                                            <TableRow key={official.id}>
                                                <TableCell className="font-medium">{official.fullName}</TableCell>
                                                <TableCell>{official.name}</TableCell>
                                                <TableCell>{official.nip}</TableCell>
                                                <TableCell>{official.position}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-destructive hover:bg-destructive/10"
                                                        onClick={() => handleDelete(official.id, official.fullName)}
                                                        disabled={deleteLoading === official.id}
                                                    >
                                                        {deleteLoading === official.id ? "..." : "Hapus"}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
