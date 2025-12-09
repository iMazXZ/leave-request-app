"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createLeaveRequest(formData: FormData) {
    const employeeId = parseInt(formData.get("employeeId") as string);
    const letterDate = new Date(formData.get("letterDate") as string);
    const leaveType = formData.get("leaveType") as string;
    const reason = formData.get("reason") as string;
    const duration = parseInt(formData.get("duration") as string);
    const durationUnit = formData.get("durationUnit") as string;
    const startDate = new Date(formData.get("startDate") as string);
    const endDate = new Date(formData.get("endDate") as string);
    const addressDuringLeave = formData.get("addressDuringLeave") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const supervisorName = formData.get("supervisorName") as string;
    const supervisorNip = formData.get("supervisorNip") as string;
    const officialName = formData.get("officialName") as string;
    const officialNip = formData.get("officialNip") as string;
    const leaveNotes = formData.get("leaveNotes") as string || "";
    const remainingN2 = parseInt(formData.get("remainingN2") as string) || 0;
    const remainingN1 = parseInt(formData.get("remainingN1") as string) || 0;
    const remainingN = parseInt(formData.get("remainingN") as string) || 12;

    const request = await prisma.leaveRequest.create({
        data: {
            employeeId,
            letterDate,
            leaveType,
            reason,
            duration,
            durationUnit,
            startDate,
            endDate,
            addressDuringLeave,
            phoneNumber,
            supervisorName,
            supervisorNip,
            officialName,
            officialNip,
            leaveNotes,
            remainingN2,
            remainingN1,
            remainingN,
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/history");

    return request.id;
}

export async function getLeaveRequests() {
    return prisma.leaveRequest.findMany({
        include: { employee: true },
        orderBy: { createdAt: "desc" },
    });
}

export async function getLeaveRequestById(id: number) {
    return prisma.leaveRequest.findUnique({
        where: { id },
        include: { employee: true },
    });
}

export async function deleteLeaveRequest(id: number) {
    await prisma.leaveRequest.delete({
        where: { id },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/history");
}

export async function updateLeaveRequest(id: number, formData: FormData) {
    const letterDate = new Date(formData.get("letterDate") as string);
    const leaveType = formData.get("leaveType") as string;
    const reason = formData.get("reason") as string;
    const duration = parseInt(formData.get("duration") as string);
    const durationUnit = formData.get("durationUnit") as string;
    const startDate = new Date(formData.get("startDate") as string);
    const endDate = new Date(formData.get("endDate") as string);
    const addressDuringLeave = formData.get("addressDuringLeave") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const supervisorName = formData.get("supervisorName") as string;
    const supervisorNip = formData.get("supervisorNip") as string;
    const officialName = formData.get("officialName") as string;
    const officialNip = formData.get("officialNip") as string;
    const leaveNotes = formData.get("leaveNotes") as string || "";
    const remainingN2 = parseInt(formData.get("remainingN2") as string) || 0;
    const remainingN1 = parseInt(formData.get("remainingN1") as string) || 0;
    const remainingN = parseInt(formData.get("remainingN") as string) || 12;

    await prisma.leaveRequest.update({
        where: { id },
        data: {
            letterDate,
            leaveType,
            reason,
            duration,
            durationUnit,
            startDate,
            endDate,
            addressDuringLeave,
            phoneNumber,
            supervisorName,
            supervisorNip,
            officialName,
            officialNip,
            leaveNotes,
            remainingN2,
            remainingN1,
            remainingN,
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/history");
}
