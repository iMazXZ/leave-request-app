"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createEmployee(formData: FormData) {
    const name = formData.get("name") as string;
    const nip = formData.get("nip") as string;
    const position = formData.get("position") as string;
    const workUnit = formData.get("workUnit") as string;

    const employee = await prisma.employee.create({
        data: {
            name,
            nip,
            position,
            yearsOfService: "-",
            workUnit,
            remainingN2: 0,
            remainingN1: 0,
            remainingN: 12,
        },
    });

    revalidatePath("/dashboard/employees");
    revalidatePath("/dashboard/request");

    return employee.id;
}

export async function updateEmployee(id: number, formData: FormData) {
    const name = formData.get("name") as string;
    const nip = formData.get("nip") as string;
    const position = formData.get("position") as string;
    const workUnit = formData.get("workUnit") as string;

    await prisma.employee.update({
        where: { id },
        data: {
            name,
            nip,
            position,
            workUnit,
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
