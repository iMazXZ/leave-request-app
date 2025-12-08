"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateEmployee } from "@/lib/actions/employee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Employee } from "@prisma/client";

export function EditEmployeeForm({ employee }: { employee: Employee }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        await updateEmployee(employee.id, formData);
        router.push("/dashboard/employees");
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Edit Pegawai</h1>
                <p className="text-slate-400">Perbarui data pegawai</p>
            </div>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Data Pegawai</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-slate-300">Nama Pegawai</Label>
                                <Input
                                    name="name"
                                    defaultValue={employee.name}
                                    required
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">NIP</Label>
                                <Input
                                    name="nip"
                                    defaultValue={employee.nip}
                                    required
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Jabatan</Label>
                                <Input
                                    name="position"
                                    defaultValue={employee.position}
                                    required
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Masa Kerja</Label>
                                <Input
                                    name="yearsOfService"
                                    defaultValue={employee.yearsOfService}
                                    required
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label className="text-slate-300">Unit Kerja</Label>
                                <Input
                                    name="workUnit"
                                    defaultValue={employee.workUnit}
                                    required
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Sisa Cuti</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Sisa Cuti (N-2)</Label>
                                    <Input
                                        name="remainingN2"
                                        type="number"
                                        defaultValue={employee.remainingN2}
                                        min="0"
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Sisa Cuti (N-1)</Label>
                                    <Input
                                        name="remainingN1"
                                        type="number"
                                        defaultValue={employee.remainingN1}
                                        min="0"
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Sisa Cuti (N)</Label>
                                    <Input
                                        name="remainingN"
                                        type="number"
                                        defaultValue={employee.remainingN}
                                        min="0"
                                        className="bg-white/5 border-white/10 text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button
                                type="button"
                                variant="ghost"
                                className="text-slate-400 hover:text-white"
                                onClick={() => router.back()}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                                {loading ? "Menyimpan..." : "Simpan Perubahan"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
