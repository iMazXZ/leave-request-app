"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";

export async function updateProfile(formData: FormData) {
    const session = await auth();
    if (!session?.user?.email) {
        throw new Error("Unauthorized");
    }

    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    // Get current user
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        throw new Error("User not found");
    }

    // If changing password, verify current password
    if (newPassword) {
        if (!currentPassword) {
            throw new Error("Current password required");
        }
        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            throw new Error("Current password is incorrect");
        }
    }

    // Prepare update data
    const updateData: { email?: string; name?: string; password?: string } = {};

    if (email && email !== user.email) {
        // Check if email is already taken
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error("Email already in use");
        }
        updateData.email = email;
    }

    if (name && name !== user.name) {
        updateData.name = name;
    }

    if (newPassword) {
        updateData.password = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(updateData).length > 0) {
        await prisma.user.update({
            where: { id: user.id },
            data: updateData,
        });
    }

    revalidatePath("/dashboard/profile");
    return { success: true };
}

export async function createUser(formData: FormData) {
    const session = await auth();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    // Check if email exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
        },
    });

    revalidatePath("/dashboard/users");
    return { success: true };
}

export async function getUsers() {
    return prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function deleteUser(id: number) {
    const session = await auth();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    // Get current user to prevent self-deletion
    const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email! },
    });

    if (currentUser?.id === id) {
        throw new Error("Cannot delete your own account");
    }

    await prisma.user.delete({
        where: { id },
    });

    revalidatePath("/dashboard/users");
}

export async function getCurrentUser() {
    const session = await auth();
    if (!session?.user?.email) {
        return null;
    }

    return prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
        },
    });
}
