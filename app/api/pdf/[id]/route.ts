import { NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { prisma } from "@/lib/prisma";
import { LeaveRequestPDF } from "@/lib/pdf/leave-request-pdf";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const leaveRequest = await prisma.leaveRequest.findUnique({
        where: { id: parseInt(id) },
        include: { employee: true },
    });

    if (!leaveRequest) {
        return new Response("Leave request not found", { status: 404 });
    }

    const pdfBuffer = await renderToBuffer(
        LeaveRequestPDF({
            data: {
                employee: leaveRequest.employee,
                letterDate: leaveRequest.letterDate,
                leaveType: leaveRequest.leaveType,
                reason: leaveRequest.reason,
                duration: leaveRequest.duration,
                durationUnit: leaveRequest.durationUnit,
                startDate: leaveRequest.startDate,
                endDate: leaveRequest.endDate,
                addressDuringLeave: leaveRequest.addressDuringLeave,
                phoneNumber: leaveRequest.phoneNumber,
                supervisorName: leaveRequest.supervisorName,
                supervisorNip: leaveRequest.supervisorNip,
                officialName: leaveRequest.officialName,
                officialNip: leaveRequest.officialNip,
            },
        })
    );

    const filename = `Surat_Cuti_${leaveRequest.employee.name.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`;

    return new Response(pdfBuffer, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename="${filename}"`,
        },
    });
}
