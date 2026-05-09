"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSigningOfficial(formData: FormData) {
    const fullName = formData.get("fullName") as string;
    const name = formData.get("name") as string;
    const nip = formData.get("nip") as string;
    const position = formData.get("position") as string;

    const existingOfficial = await prisma.signingOfficial.findUnique({
        where: { nip },
    });

    if (existingOfficial) {
        throw new Error("NIP pejabat sudah terdaftar");
    }

    await prisma.signingOfficial.create({
        data: {
            fullName,
            name,
            nip,
            position,
        },
    });

    revalidatePath("/dashboard/signing-officials");
    revalidatePath("/dashboard/request");

    return { success: true };
}

export async function deleteSigningOfficial(id: number) {
    await prisma.signingOfficial.delete({
        where: { id },
    });

    revalidatePath("/dashboard/signing-officials");
    revalidatePath("/dashboard/request");
}

export async function getSigningOfficials() {
    return prisma.signingOfficial.findMany({
        orderBy: { createdAt: "desc" },
    });
}
