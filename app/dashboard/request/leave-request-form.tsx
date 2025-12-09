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

interface LeaveRequestFormProps {
    employees: Employee[];
    preselectedEmployee?: Employee | null;
}

export function LeaveRequestForm({ employees, preselectedEmployee }: LeaveRequestFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(preselectedEmployee || null);
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
            <Card className="max-w-2xl mx-auto">
                <CardContent className="pt-8 text-center">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Surat Cuti Berhasil Dibuat!</h2>
                    <p className="text-muted-foreground mb-8">
                        Surat cuti untuk {selectedEmployee?.name} telah berhasil dibuat.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button
                            variant="ghost"
                            onClick={() => router.push("/dashboard")}
                        >
                            Kembali ke Dashboard
                        </Button>
                        <a href={`/api/pdf/${createdId}`} target="_blank" rel="noopener noreferrer">
                            <Button className="bg-primary hover:bg-primary/90">
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
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-sm text-primary-foreground">I</span>
                        Data Pegawai
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Cari Pegawai</Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between"
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
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Cari nama atau NIP..." />
                                    <CommandList>
                                        <CommandEmpty className="py-6 text-center">
                                            <p className="text-muted-foreground mb-3">Pegawai tidak ditemukan</p>
                                            <a href="/dashboard/employees/new">
                                                <Button size="sm" className="bg-primary hover:bg-primary/90">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <circle cx="12" cy="12" r="10" />
                                                        <line x1="12" x2="12" y1="8" y2="16" />
                                                        <line x1="8" x2="16" y1="12" y2="12" />
                                                    </svg>
                                                    Tambah Pegawai Baru
                                                </Button>
                                            </a>
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
                                                    className="cursor-pointer"
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{emp.name}</span>
                                                        <span className="text-xs text-muted-foreground">NIP: {emp.nip} • {emp.position}</span>
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
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-xl">
                                <div>
                                    <p className="text-xs text-muted-foreground">Nama</p>
                                    <p className="font-medium">{selectedEmployee.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">NIP</p>
                                    <p className="font-medium">{selectedEmployee.nip}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Jabatan</p>
                                    <p className="font-medium">{selectedEmployee.position}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Masa Kerja</p>
                                    <p className="font-medium">{selectedEmployee.yearsOfService}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-xs text-muted-foreground">Unit Kerja</p>
                                    <p className="font-medium">{selectedEmployee.workUnit}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-xl border">
                                <div className="space-y-2">
                                    <Label>Sisa Cuti N-2 (hari)</Label>
                                    <Input
                                        name="remainingN2"
                                        type="number"
                                        min="0"
                                        defaultValue={selectedEmployee.remainingN2}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Sisa Cuti N-1 (hari)</Label>
                                    <Input
                                        name="remainingN1"
                                        type="number"
                                        min="0"
                                        defaultValue={selectedEmployee.remainingN1}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Sisa Cuti N (hari)</Label>
                                    <Input
                                        name="remainingN"
                                        type="number"
                                        min="0"
                                        defaultValue={selectedEmployee.remainingN}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Section 2: Detail Cuti */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-sm text-white">II</span>
                        Detail Pengajuan Cuti
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Tanggal Surat</Label>
                            <Input
                                name="letterDate"
                                type="date"
                                defaultValue={today}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Jenis Cuti</Label>
                            <Select name="leaveType" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih jenis cuti" />
                                </SelectTrigger>
                                <SelectContent>
                                    {LEAVE_TYPES.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Alasan Cuti</Label>
                        <Textarea
                            name="reason"
                            required
                            className="min-h-[100px]"
                            placeholder="Jelaskan alasan pengajuan cuti..."
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label>Durasi</Label>
                            <Input
                                name="duration"
                                type="number"
                                min="1"
                                required
                                placeholder="3"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Satuan Waktu</Label>
                            <Select name="durationUnit" defaultValue="Hari">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {DURATION_UNITS.map((unit) => (
                                        <SelectItem key={unit} value={unit}>
                                            {unit}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Tanggal Mulai</Label>
                            <Input
                                name="startDate"
                                type="date"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Tanggal Selesai</Label>
                            <Input
                                name="endDate"
                                type="date"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Catatan Cuti (Bagian V)</Label>
                        <Textarea
                            name="leaveNotes"
                            className="min-h-[80px]"
                            placeholder="Contoh: Yang bersangkutan mengambil cuti tahun 2025 sebanyak 3 hari, sisa total saldo cuti Tahun 2025 sebanyak 12 hari"
                        />
                        <p className="text-xs text-muted-foreground">Teks ini akan muncul di bagian V (Keterangan) pada surat cuti</p>
                    </div>
                </CardContent>
            </Card>

            {/* Section 3: Kontak Selama Cuti */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-sm text-primary-foreground">III</span>
                        Kontak Selama Cuti
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Alamat Lengkap</Label>
                        <Textarea
                            name="addressDuringLeave"
                            required
                            placeholder="Alamat lengkap selama menjalani cuti..."
                        />
                    </div>
                    <div className="space-y-2 max-w-md">
                        <Label>No. Telepon</Label>
                        <Input
                            name="phoneNumber"
                            required
                            placeholder="08xxxxxxxxxx"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Section 4: Pejabat Penandatangan */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center text-sm text-white">IV</span>
                        Pejabat Penandatangan
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Nama Atasan Langsung</Label>
                            <Input
                                name="supervisorName"
                                required
                                placeholder="Nama atasan langsung"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>NIP Atasan Langsung</Label>
                            <Input
                                name="supervisorNip"
                                required
                                placeholder="NIP atasan langsung"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Nama Pejabat Berwenang (Kepala)</Label>
                            <Input
                                name="officialName"
                                defaultValue="SASTRA IRAWAN"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>NIP Pejabat Berwenang</Label>
                            <Input
                                name="officialNip"
                                defaultValue="197711052000121001"
                                required
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row justify-end gap-4">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.back()}
                >
                    Batal
                </Button>
                <Button
                    type="submit"
                    disabled={loading || !selectedEmployee}
                    className="bg-primary hover:bg-primary/90 px-8"
                >
                    {loading ? "Membuat Surat..." : "Buat Surat Cuti"}
                </Button>
            </div>
        </form>
    );
}
