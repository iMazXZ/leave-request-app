"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createEmployee } from "@/lib/actions/employee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewEmployeePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const employeeId = await createEmployee(formData);
        // Redirect to leave request form with the new employee ID
        router.push(`/dashboard/request?employeeId=${employeeId}`);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Tambah Pegawai Baru</h1>
                <p className="text-muted-foreground">Masukkan data pegawai untuk digunakan dalam pengajuan cuti</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Data Pegawai</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Nama Pegawai</Label>
                                <Input
                                    name="name"
                                    required
                                    placeholder="Nama lengkap"
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
                                    placeholder="Jabatan pegawai"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Masa Kerja</Label>
                                <Input
                                    name="yearsOfService"
                                    required
                                    placeholder="Contoh: 7 Tahun"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Unit Kerja</Label>
                                <Input
                                    name="workUnit"
                                    defaultValue="Lapas Kelas IIB Gunung Sugih"
                                    required
                                />
                            </div>
                        </div>

                        <div className="border-t border-border pt-6">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Sisa Cuti</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label>Sisa Cuti (N-2)</Label>
                                    <Input
                                        name="remainingN2"
                                        type="number"
                                        defaultValue="0"
                                        min="0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Sisa Cuti (N-1)</Label>
                                    <Input
                                        name="remainingN1"
                                        type="number"
                                        defaultValue="0"
                                        min="0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Sisa Cuti (N)</Label>
                                    <Input
                                        name="remainingN"
                                        type="number"
                                        defaultValue="12"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => router.back()}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-primary hover:bg-primary/90"
                            >
                                {loading ? "Menyimpan..." : "Simpan & Buat Surat Cuti"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
