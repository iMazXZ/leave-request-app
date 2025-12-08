"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Employee } from "@prisma/client";
import { createLeaveRequest } from "@/lib/actions/leave-request";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const LEAVE_TYPES = [
    "Cuti Tahunan",
    "Cuti Besar",
    "Cuti Sakit",
    "Cuti Melahirkan",
    "Cuti Karena Alasan Penting",
    "Cuti di Luar Tanggungan Negara",
];

const DURATION_UNITS = ["Hari", "Bulan", "Tahun"];

export function LeaveRequestForm({ employees }: { employees: Employee[] }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [open, setOpen] = useState(false);
    const [createdId, setCreatedId] = useState<number | null>(null);

    const today = new Date().toISOString().split("T")[0];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedEmployee) {
            alert("Silakan pilih pegawai terlebih dahulu");
            return;
        }

        setLoading(true);
        const formData = new FormData(e.currentTarget);
        formData.set("employeeId", selectedEmployee.id.toString());

        const id = await createLeaveRequest(formData);
        setCreatedId(id);
        setLoading(false);
    };

    if (createdId) {
        return (
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 max-w-2xl mx-auto">
                <CardContent className="pt-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/25">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Surat Cuti Berhasil Dibuat!</h2>
                    <p className="text-slate-400 mb-8">
                        Surat cuti untuk {selectedEmployee?.name} telah berhasil dibuat.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button
                            variant="ghost"
                            className="text-slate-400 hover:text-white"
                            onClick={() => router.push("/dashboard")}
                        >
                            Kembali ke Dashboard
                        </Button>
                        <a href={`/api/pdf/${createdId}`} target="_blank" rel="noopener noreferrer">
                            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" x2="12" y1="15" y2="3" />
                                </svg>
                                Download PDF
                            </Button>
                        </a>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Data Pegawai */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm">I</span>
                        Data Pegawai
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-slate-300">Cari Pegawai</Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between bg-white/5 border-white/10 text-white hover:bg-white/10"
                                >
                                    {selectedEmployee
                                        ? `${selectedEmployee.name} - ${selectedEmployee.nip}`
                                        : "Pilih pegawai..."}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 shrink-0 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m7 15 5 5 5-5" />
                                        <path d="m7 9 5-5 5 5" />
                                    </svg>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0 bg-slate-800 border-white/10">
                                <Command className="bg-transparent">
                                    <CommandInput placeholder="Cari nama atau NIP..." className="text-white" />
                                    <CommandList>
                                        <CommandEmpty className="text-slate-400 py-6 text-center">
                                            Pegawai tidak ditemukan. <a href="/dashboard/employees/new" className="text-blue-400 hover:underline">Tambah baru?</a>
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {employees.map((emp) => (
                                                <CommandItem
                                                    key={emp.id}
                                                    value={`${emp.name} ${emp.nip}`}
                                                    onSelect={() => {
                                                        setSelectedEmployee(emp);
                                                        setOpen(false);
                                                    }}
                                                    className="text-white hover:bg-white/10 cursor-pointer"
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{emp.name}</span>
                                                        <span className="text-xs text-slate-400">NIP: {emp.nip} • {emp.position}</span>
                                                    </div>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {selectedEmployee && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/5 rounded-xl">
                            <div>
                                <p className="text-xs text-slate-400">Nama</p>
                                <p className="text-white font-medium">{selectedEmployee.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">NIP</p>
                                <p className="text-white font-medium">{selectedEmployee.nip}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">Jabatan</p>
                                <p className="text-white font-medium">{selectedEmployee.position}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">Masa Kerja</p>
                                <p className="text-white font-medium">{selectedEmployee.yearsOfService}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-xs text-slate-400">Unit Kerja</p>
                                <p className="text-white font-medium">{selectedEmployee.workUnit}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">Sisa Cuti N-2</p>
                                <p className="text-white font-medium">{selectedEmployee.remainingN2} hari</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">Sisa Cuti N-1</p>
                                <p className="text-white font-medium">{selectedEmployee.remainingN1} hari</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">Sisa Cuti N (Tahun Berjalan)</p>
                                <p className="text-white font-medium">{selectedEmployee.remainingN} hari</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Section 2: Detail Cuti */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <span className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-sm">II</span>
                        Detail Pengajuan Cuti
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-slate-300">Tanggal Surat</Label>
                            <Input
                                name="letterDate"
                                type="date"
                                defaultValue={today}
                                required
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">Jenis Cuti</Label>
                            <Select name="leaveType" required>
                                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                    <SelectValue placeholder="Pilih jenis cuti" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-white/10">
                                    {LEAVE_TYPES.map((type) => (
                                        <SelectItem key={type} value={type} className="text-white hover:bg-white/10">
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-slate-300">Alasan Cuti</Label>
                        <Textarea
                            name="reason"
                            required
                            className="bg-white/5 border-white/10 text-white min-h-[100px]"
                            placeholder="Jelaskan alasan pengajuan cuti..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label className="text-slate-300">Durasi</Label>
                            <Input
                                name="duration"
                                type="number"
                                min="1"
                                required
                                className="bg-white/5 border-white/10 text-white"
                                placeholder="3"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">Satuan Waktu</Label>
                            <Select name="durationUnit" defaultValue="Hari">
                                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-white/10">
                                    {DURATION_UNITS.map((unit) => (
                                        <SelectItem key={unit} value={unit} className="text-white hover:bg-white/10">
                                            {unit}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">Tanggal Mulai</Label>
                            <Input
                                name="startDate"
                                type="date"
                                required
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">Tanggal Selesai</Label>
                            <Input
                                name="endDate"
                                type="date"
                                required
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Section 3: Kontak Selama Cuti */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <span className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-sm">III</span>
                        Kontak Selama Cuti
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-slate-300">Alamat Lengkap</Label>
                        <Textarea
                            name="addressDuringLeave"
                            required
                            className="bg-white/5 border-white/10 text-white"
                            placeholder="Alamat lengkap selama menjalani cuti..."
                        />
                    </div>
                    <div className="space-y-2 max-w-md">
                        <Label className="text-slate-300">No. Telepon</Label>
                        <Input
                            name="phoneNumber"
                            required
                            className="bg-white/5 border-white/10 text-white"
                            placeholder="08xxxxxxxxxx"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Section 4: Pejabat Penandatangan */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <span className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center text-sm">IV</span>
                        Pejabat Penandatangan
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-slate-300">Nama Atasan Langsung</Label>
                            <Input
                                name="supervisorName"
                                required
                                className="bg-white/5 border-white/10 text-white"
                                placeholder="Nama atasan langsung"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">NIP Atasan Langsung</Label>
                            <Input
                                name="supervisorNip"
                                required
                                className="bg-white/5 border-white/10 text-white"
                                placeholder="NIP atasan langsung"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">Nama Pejabat Berwenang (Kepala)</Label>
                            <Input
                                name="officialName"
                                defaultValue="SASTRA IRAWAN"
                                required
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">NIP Pejabat Berwenang</Label>
                            <Input
                                name="officialNip"
                                defaultValue="197711052000121001"
                                required
                                className="bg-white/5 border-white/10 text-white"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end gap-4">
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
                    disabled={loading || !selectedEmployee}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
                >
                    {loading ? "Membuat Surat..." : "Buat Surat Cuti"}
                </Button>
            </div>
        </form>
    );
}
