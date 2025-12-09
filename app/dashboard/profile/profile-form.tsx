"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/lib/actions/user";

interface ProfileFormProps {
    user: {
        id: number;
        email: string;
        name: string;
    };
}

export function ProfileForm({ user }: ProfileFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const formData = new FormData(e.currentTarget);
            await updateProfile(formData);
            setMessage({ type: "success", text: "Profil berhasil diperbarui" });
            router.refresh();
        } catch (error) {
            setMessage({ type: "error", text: error instanceof Error ? error.message : "Gagal memperbarui profil" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
                <div className={`p-4 rounded-lg ${message.type === "success" ? "bg-green-500/10 text-green-600 border border-green-500/20" : "bg-destructive/10 text-destructive border border-destructive/20"}`}>
                    {message.text}
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Informasi Akun</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Nama</Label>
                            <Input
                                name="name"
                                defaultValue={user.name}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                name="email"
                                type="email"
                                defaultValue={user.email}
                                required
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Ubah Kata Sandi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">Kosongkan jika tidak ingin mengubah kata sandi</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Kata Sandi Saat Ini</Label>
                            <Input
                                name="currentPassword"
                                type="password"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Kata Sandi Baru</Label>
                            <Input
                                name="newPassword"
                                type="password"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-primary/90"
                >
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
            </div>
        </form>
    );
}
