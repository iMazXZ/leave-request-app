import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditLeaveRequestForm from "./edit-form";

export default async function EditLeaveRequestPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const [leaveRequest, signingOfficials] = await Promise.all([
        prisma.leaveRequest.findUnique({
            where: { id: parseInt(id) },
            include: { employee: true },
        }),
        prisma.signingOfficial.findMany({
            orderBy: { createdAt: "desc" },
        }),
    ]);

    if (!leaveRequest) {
        notFound();
    }

    return <EditLeaveRequestForm leaveRequest={leaveRequest} signingOfficials={signingOfficials} />;
}
