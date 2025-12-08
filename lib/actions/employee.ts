"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createEmployee(formData: FormData) {
    const name = formData.get("name") as string;
    const nip = formData.get("nip") as string;
    const position = formData.get("position") as string;
    const yearsOfService = formData.get("yearsOfService") as string;
    const workUnit = formData.get("workUnit") as string;
    const remainingN2 = parseInt(formData.get("remainingN2") as string) || 0;
    const remainingN1 = parseInt(formData.get("remainingN1") as string) || 0;
    const remainingN = parseInt(formData.get("remainingN") as string) || 12;

    await prisma.employee.create({
        data: {
            name,
            nip,
            position,
            yearsOfService,
            workUnit,
            remainingN2,
            remainingN1,
            remainingN,
        },
    });

    revalidatePath("/dashboard/employees");
}

export async function updateEmployee(id: number, formData: FormData) {
    const name = formData.get("name") as string;
    const nip = formData.get("nip") as string;
    const position = formData.get("position") as string;
    const yearsOfService = formData.get("yearsOfService") as string;
    const workUnit = formData.get("workUnit") as string;
    const remainingN2 = parseInt(formData.get("remainingN2") as string) || 0;
    const remainingN1 = parseInt(formData.get("remainingN1") as string) || 0;
    const remainingN = parseInt(formData.get("remainingN") as string) || 12;

    await prisma.employee.update({
        where: { id },
        data: {
            name,
            nip,
            position,
            yearsOfService,
            workUnit,
            remainingN2,
            remainingN1,
            remainingN,
        },
    });

    revalidatePath("/dashboard/employees");
}

export async function deleteEmployee(id: number) {
    await prisma.employee.delete({
        where: { id },
    });

    revalidatePath("/dashboard/employees");
}

export async function getEmployees() {
    return prisma.employee.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function searchEmployees(query: string) {
    return prisma.employee.findMany({
        where: {
            OR: [
                { name: { contains: query } },
                { nip: { contains: query } },
            ],
        },
        take: 10,
    });
}

export async function getEmployeeById(id: number) {
    return prisma.employee.findUnique({
        where: { id },
    });
}
