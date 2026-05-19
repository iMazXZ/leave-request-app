"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface SidebarProps {
    user: {
        name?: string | null;
        email?: string | null;
    };
    onLogout: () => void;
}

export function Sidebar({ user, onLogout }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
            ),
        },
        {
            href: "/dashboard/request",
            label: "Buat Surat Cuti",
            featured: true,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" x2="12" y1="18" y2="12" />
                    <line x1="9" x2="15" y1="15" y2="15" />
                </svg>
            ),
        },
        {
            href: "/dashboard/employees",
            label: "Daftar Pegawai",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
        },
        {
            href: "/dashboard/signing-officials",
            label: "Daftar Pejabat",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <polyline points="16 11 18 13 22 9" />
                </svg>
            ),
        },
        {
            href: "/dashboard/history",
            label: "Riwayat Cuti",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M12 7v5l4 2" />
                </svg>
            ),
        },
    ];

    const settingsItems = [
        {
            href: "/dashboard/profile",
            label: "Edit Profil",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="5" />
                    <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
            ),
        },
        {
            href: "/dashboard/users",
            label: "Kelola Akun",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            ),
        },
    ];

    const isActive = (href: string) => {
        if (href === "/dashboard") {
            return pathname === "/dashboard";
        }
        return pathname.startsWith(href);
    };

    return (
        <>
            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-4">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" x2="20" y1="12" y2="12" />
                        <line x1="4" x2="20" y1="6" y2="6" />
                        <line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                </button>
                <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[#0b2346]">
                        <Image
                            src="/kemenimipas-logo.jpeg"
                            alt="Logo Kemenimipas"
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <span className="max-w-[150px] text-xs font-semibold leading-tight text-foreground sm:text-sm">
                        e-Cuti Lapas Gunung Sugih
                    </span>
                </div>
                <ThemeToggle />
            </header>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-50"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 flex flex-col
                    transform transition-transform duration-300 ease-in-out
                    lg:translate-x-0
                    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                <div className="flex-1 overflow-y-auto p-6 pb-4">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#0b2346]">
                                <Image
                                    src="/kemenimipas-logo.jpeg"
                                    alt="Logo Kemenimipas"
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <h1 className="max-w-[140px] text-sm font-bold leading-tight text-foreground">
                                    e-Cuti Lapas Gunung Sugih
                                </h1>
                                <p className="text-xs text-muted-foreground">Aplikasi pengajuan cuti</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>

                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                    ${item.featured && !isActive(item.href)
                                        ? "border border-primary/20 bg-primary/10 text-primary font-medium hover:bg-primary/15"
                                        : isActive(item.href)
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }
                                `}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}

                        <div className="pt-4 mt-4 border-t border-border">
                            <p className="px-4 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Pengaturan</p>
                            {settingsItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                        ${isActive(item.href)
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }
                                    `}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>

                <div className="shrink-0 border-t border-border p-4 space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 shrink-0 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold">
                            {user.name?.charAt(0) || "A"}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
                        <span className="text-xs text-muted-foreground">Tema</span>
                        <ThemeToggle />
                    </div>
                    <form action={onLogout}>
                        <Button
                            type="submit"
                            variant="ghost"
                            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" x2="9" y1="12" y2="12" />
                            </svg>
                            Logout
                        </Button>
                    </form>
                </div>
            </aside>
        </>
    );
}
