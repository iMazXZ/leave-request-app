"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createUser, deleteUser } from "@/lib/actions/user";

interface User {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
}

export function UsersTable({ users: initialUsers, currentUserEmail }: { users: User[]; currentUserEmail: string }) {
    const [users, setUsers] = useState(initialUsers);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const formData = new FormData(e.currentTarget);
            await createUser(formData);
            setMessage({ type: "success", text: "Akun berhasil dibuat" });
            setShowAddForm(false);
            // Refresh page to get updated list
            window.location.reload();
        } catch (error) {
            setMessage({ type: "error", text: error instanceof Error ? error.message : "Gagal membuat akun" });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number, email: string) => {
        if (email === currentUserEmail) {
            setMessage({ type: "error", text: "Tidak dapat menghapus akun sendiri" });
            return;
        }
        if (!confirm(`Yakin ingin menghapus akun ${email}?`)) return;

        setDeleteLoading(id);
        try {
            await deleteUser(id);
            setUsers(users.filter(u => u.id !== id));
            setMessage({ type: "success", text: "Akun berhasil dihapus" });
        } catch (error) {
            setMessage({ type: "error", text: error instanceof Error ? error.message : "Gagal menghapus akun" });
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
                    Tambah Akun Admin
                </Button>
            </div>

            {showAddForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>Tambah Akun Admin Baru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label>Nama</Label>
                                    <Input name="name" required placeholder="Nama lengkap" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input name="email" type="email" required placeholder="email@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Kata Sandi</Label>
                                    <Input name="password" type="password" required placeholder="••••••••" minLength={6} />
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
                    <CardTitle>Daftar Akun Admin</CardTitle>
                </CardHeader>
                <CardContent>
                    {users.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">Belum ada akun</p>
                    ) : (
                        <div className="space-y-3">
                            {users.map((user) => (
                                <div key={user.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 pl-13 sm:pl-0">
                                        <span className="text-xs text-muted-foreground">
                                            Dibuat: {new Date(user.createdAt).toLocaleDateString("id-ID")}
                                        </span>
                                        {user.email !== currentUserEmail && (
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-destructive hover:bg-destructive/10"
                                                onClick={() => handleDelete(user.id, user.email)}
                                                disabled={deleteLoading === user.id}
                                            >
                                                {deleteLoading === user.id ? "..." : "Hapus"}
                                            </Button>
                                        )}
                                        {user.email === currentUserEmail && (
                                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Anda</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
