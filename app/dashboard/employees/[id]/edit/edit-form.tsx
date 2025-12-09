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
        <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Edit Pegawai</h1>
                <p className="text-muted-foreground">Perbarui data pegawai</p>
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
                                    defaultValue={employee.name}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>NIP</Label>
                                <Input
                                    name="nip"
                                    defaultValue={employee.nip}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Jabatan</Label>
                                <Input
                                    name="position"
                                    defaultValue={employee.position}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Masa Kerja</Label>
                                <Input
                                    name="yearsOfService"
                                    defaultValue={employee.yearsOfService}
                                    required
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Unit Kerja</Label>
                                <Input
                                    name="workUnit"
                                    defaultValue={employee.workUnit}
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
                                        defaultValue={employee.remainingN2}
                                        min="0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Sisa Cuti (N-1)</Label>
                                    <Input
                                        name="remainingN1"
                                        type="number"
                                        defaultValue={employee.remainingN1}
                                        min="0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Sisa Cuti (N)</Label>
                                    <Input
                                        name="remainingN"
                                        type="number"
                                        defaultValue={employee.remainingN}
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
                                {loading ? "Menyimpan..." : "Simpan Perubahan"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
