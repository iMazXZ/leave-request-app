"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateLeaveRequest } from "@/lib/actions/leave-request";

interface EditLeaveRequestFormProps {
    leaveRequest: {
        id: number;
        letterDate: Date;
        leaveType: string;
        reason: string;
        duration: number;
        durationUnit: string;
        startDate: Date;
        endDate: Date;
        addressDuringLeave: string;
        phoneNumber: string;
        supervisorName: string;
        supervisorNip: string;
        officialName: string;
        officialNip: string;
        leaveNotes: string;
        remainingN2: number;
        remainingN1: number;
        remainingN: number;
        employee: {
            id: number;
            name: string;
            nip: string;
        };
    };
}

export default function EditLeaveRequestForm({ leaveRequest }: EditLeaveRequestFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [leaveType, setLeaveType] = useState(leaveRequest.leaveType);
    const [durationUnit, setDurationUnit] = useState(leaveRequest.durationUnit);

    const formatDateForInput = (date: Date) => {
        return new Date(date).toISOString().split("T")[0];
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.set("leaveType", leaveType);
        formData.set("durationUnit", durationUnit);

        await updateLeaveRequest(leaveRequest.id, formData);
        router.push("/dashboard/history");
        router.refresh();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Edit Surat Cuti</h1>
                <p className="text-muted-foreground">
                    Edit pengajuan cuti untuk {leaveRequest.employee.name}
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Data Pengajuan Cuti</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Pegawai Info */}
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="font-medium">{leaveRequest.employee.name}</p>
                            <p className="text-sm text-muted-foreground">NIP: {leaveRequest.employee.nip}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Tanggal Surat</Label>
                                <Input
                                    type="date"
                                    name="letterDate"
                                    defaultValue={formatDateForInput(leaveRequest.letterDate)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Jenis Cuti</Label>
                                <Select value={leaveType} onValueChange={setLeaveType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih jenis cuti" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Cuti Tahunan">Cuti Tahunan</SelectItem>
                                        <SelectItem value="Cuti Besar">Cuti Besar</SelectItem>
                                        <SelectItem value="Cuti Sakit">Cuti Sakit</SelectItem>
                                        <SelectItem value="Cuti Melahirkan">Cuti Melahirkan</SelectItem>
                                        <SelectItem value="Cuti Karena Alasan Penting">Cuti Karena Alasan Penting</SelectItem>
                                        <SelectItem value="Cuti di Luar Tanggungan Negara">Cuti di Luar Tanggungan Negara</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label>Alasan Cuti</Label>
                                <Textarea
                                    name="reason"
                                    defaultValue={leaveRequest.reason}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Durasi</Label>
                                <Input
                                    type="number"
                                    name="duration"
                                    defaultValue={leaveRequest.duration}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Satuan Durasi</Label>
                                <Select value={durationUnit} onValueChange={setDurationUnit}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih satuan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Hari">Hari</SelectItem>
                                        <SelectItem value="Bulan">Bulan</SelectItem>
                                        <SelectItem value="Tahun">Tahun</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Tanggal Mulai</Label>
                                <Input
                                    type="date"
                                    name="startDate"
                                    defaultValue={formatDateForInput(leaveRequest.startDate)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Tanggal Selesai</Label>
                                <Input
                                    type="date"
                                    name="endDate"
                                    defaultValue={formatDateForInput(leaveRequest.endDate)}
                                    required
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label>Alamat Selama Cuti</Label>
                                <Textarea
                                    name="addressDuringLeave"
                                    defaultValue={leaveRequest.addressDuringLeave}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>No. Telepon</Label>
                                <Input
                                    type="text"
                                    name="phoneNumber"
                                    defaultValue={leaveRequest.phoneNumber}
                                    required
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label>Catatan Cuti (Bagian V)</Label>
                                <Textarea
                                    name="leaveNotes"
                                    defaultValue={leaveRequest.leaveNotes}
                                    placeholder="Contoh: Yang bersangkutan mengambil cuti tahun 2025 sebanyak 3 hari, sisa total saldo cuti Tahun 2025 sebanyak 12 hari"
                                />
                                <p className="text-xs text-muted-foreground">Teks ini akan muncul di bagian V (Keterangan) pada surat cuti</p>
                            </div>
                        </div>

                        {/* Sisa Cuti */}
                        <div className="border-t border-border pt-6">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Sisa Cuti</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label>N-2 (hari)</Label>
                                    <Input
                                        type="number"
                                        name="remainingN2"
                                        defaultValue={leaveRequest.remainingN2}
                                        min="0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>N-1 (hari)</Label>
                                    <Input
                                        type="number"
                                        name="remainingN1"
                                        defaultValue={leaveRequest.remainingN1}
                                        min="0"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>N (hari)</Label>
                                    <Input
                                        type="number"
                                        name="remainingN"
                                        defaultValue={leaveRequest.remainingN}
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Atasan Langsung */}
                        <div className="border-t border-border pt-6">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Atasan Langsung</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Nama Atasan</Label>
                                    <Input
                                        type="text"
                                        name="supervisorName"
                                        defaultValue={leaveRequest.supervisorName}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>NIP Atasan</Label>
                                    <Input
                                        type="text"
                                        name="supervisorNip"
                                        defaultValue={leaveRequest.supervisorNip}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pejabat Berwenang */}
                        <div className="border-t border-border pt-6">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Pejabat Berwenang</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Nama Pejabat</Label>
                                    <Input
                                        type="text"
                                        name="officialName"
                                        defaultValue={leaveRequest.officialName}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>NIP Pejabat</Label>
                                    <Input
                                        type="text"
                                        name="officialNip"
                                        defaultValue={leaveRequest.officialNip}
                                        required
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
