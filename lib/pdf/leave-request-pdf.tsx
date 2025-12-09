import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

// F4 size in points (215.9mm x 330.2mm)
const F4_WIDTH = 612;
const F4_HEIGHT = 936;

const styles = StyleSheet.create({
    page: {
        padding: 30,
        paddingTop: 25,
        paddingBottom: 20,
        fontSize: 9,
        fontFamily: "Helvetica",
        lineHeight: 1.3,
    },
    header: {
        textAlign: "right",
        marginBottom: 8,
        fontSize: 9,
    },
    title: {
        textAlign: "center",
        fontFamily: "Helvetica",
        fontSize: 10,
        marginBottom: 8,
    },
    section: {
        marginBottom: 5,
    },
    table: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: "#000",
    },
    tableRow: {
        flexDirection: "row",
    },
    cell: {
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#000",
        padding: 1,
        paddingLeft: 4,
        fontSize: 8,
    },
    cellHeader: {
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#000",
        padding: 1,
        fontSize: 9,
        paddingLeft: 4,
        fontFamily: "Helvetica",
    },
    cellNoBorder: {
        padding: 1,
        paddingLeft: 4,
        fontSize: 8,
    },
    signatureName: {
        fontFamily: "Helvetica",
        fontSize: 8,
    },
    notes: {
        marginTop: 8,
        fontSize: 7,
    },
});

interface LeaveRequestData {
    employee: {
        name: string;
        nip: string;
        position: string;
        yearsOfService: string;
        workUnit: string;
    };
    letterDate: Date;
    leaveType: string;
    reason: string;
    duration: number;
    durationUnit: string;
    startDate: Date;
    endDate: Date;
    addressDuringLeave: string;
    phoneNumber: string;
    supervisorName: string;
    supervisorNip: string;
    officialName: string;
    officialNip: string;
    leaveNotes: string;
    remainingN2: number;
    remainingN1: number;
    remainingN: number;
}

function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function getLocationName(workUnit: string): string {
    const match = workUnit.match(/(?:IIA|IIB|I)\s+(.+)$/);
    if (match) return match[1];
    const words = workUnit.split(" ");
    return words.slice(-2).join(" ");
}

export function LeaveRequestPDF({ data }: { data: LeaveRequestData }) {
    const currentYear = new Date().getFullYear();
    const location = getLocationName(data.employee.workUnit);

    return (
        <Document>
            <Page size={{ width: F4_WIDTH, height: F4_HEIGHT }} style={styles.page}>
                {/* Header */}
                <View style={[styles.header, { paddingTop: 10 }]}>
                    <Text>{location}, {formatDate(data.letterDate)}</Text>
                    <Text>Yth. Kepala Lapas Kelas IIB Gunung Sugih</Text>
                    <Text>di</Text>
                    <Text>Gunung Sugih</Text>
                </View>

                {/* Title */}
                <Text style={styles.title}>Formulir Permintaan dan Pemberian Cuti</Text>

                {/* I. DATA PEGAWAI */}
                <View style={styles.section}>
                    <View style={styles.table}>
                        {/* Header row inside table */}
                        <View style={styles.tableRow}>
                            <View style={[styles.cellHeader, { width: "100%" }]}><Text>I.    DATA PEGAWAI</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "12%" }]}><Text>Nama</Text></View>
                            <View style={[styles.cell, { width: "38%", fontFamily: "Helvetica-Bold" }]}><Text>{data.employee.name.toUpperCase()}</Text></View>
                            <View style={[styles.cell, { width: "12%" }]}><Text>NIP</Text></View>
                            <View style={[styles.cell, { width: "38%" }]}><Text>{data.employee.nip}</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "12%" }]}><Text>Jabatan</Text></View>
                            <View style={[styles.cell, { width: "38%" }]}><Text>{data.employee.position}</Text></View>
                            <View style={[styles.cell, { width: "12%" }]}><Text>Masa Kerja</Text></View>
                            <View style={[styles.cell, { width: "38%" }]}><Text>{data.employee.yearsOfService}</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "12%" }]}><Text>Unit Kerja</Text></View>
                            <View style={[styles.cell, { width: "88%" }]}><Text>{data.employee.workUnit}</Text></View>
                        </View>
                    </View>
                </View>

                {/* II. JENIS CUTI YANG DIAMBIL */}
                <View style={styles.section}>
                    <View style={styles.table}>
                        {/* Header row inside table */}
                        <View style={styles.tableRow}>
                            <View style={[styles.cellHeader, { width: "100%" }]}><Text>II.    JENIS CUTI YANG DIAMBIL **</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "5%", borderRightWidth: 0 }]}><Text>1.</Text></View>
                            <View style={[styles.cell, { width: "35%" }]}><Text>Cuti Tahunan</Text></View>
                            <View style={[styles.cell, { width: "10%", textAlign: "center" }]}><Text>{data.leaveType === "Cuti Tahunan" ? "\u2713" : ""}</Text></View>
                            <View style={[styles.cell, { width: "5%", borderRightWidth: 0 }]}><Text>2.</Text></View>
                            <View style={[styles.cell, { width: "45%" }]}><Text>Cuti Besar</Text></View>
                            <View style={[styles.cell, { width: "10%", textAlign: "center" }]}><Text>{data.leaveType === "Cuti Besar" ? "\u2713" : ""}</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "5%", borderRightWidth: 0 }]}><Text>3.</Text></View>
                            <View style={[styles.cell, { width: "35%" }]}><Text>Cuti Sakit</Text></View>
                            <View style={[styles.cell, { width: "10%", textAlign: "center" }]}><Text>{data.leaveType === "Cuti Sakit" ? "\u2713" : ""}</Text></View>
                            <View style={[styles.cell, { width: "5%", borderRightWidth: 0 }]}><Text>4.</Text></View>
                            <View style={[styles.cell, { width: "45%" }]}><Text>Cuti Melahirkan</Text></View>
                            <View style={[styles.cell, { width: "10%", textAlign: "center" }]}><Text>{data.leaveType === "Cuti Melahirkan" ? "\u2713" : ""}</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "5%", borderRightWidth: 0 }]}><Text>5.</Text></View>
                            <View style={[styles.cell, { width: "35%" }]}><Text>Cuti Karena Alasan Penting</Text></View>
                            <View style={[styles.cell, { width: "10%", textAlign: "center" }]}><Text>{data.leaveType === "Cuti Karena Alasan Penting" ? "\u2713" : ""}</Text></View>
                            <View style={[styles.cell, { width: "5%", borderRightWidth: 0 }]}><Text>6.</Text></View>
                            <View style={[styles.cell, { width: "45%" }]}><Text>Cuti di Luar Tanggungan Negara</Text></View>
                            <View style={[styles.cell, { width: "10%", textAlign: "center" }]}><Text>{data.leaveType === "Cuti di Luar Tanggungan Negara" ? "\u2713" : ""}</Text></View>
                        </View>
                    </View>
                </View>

                {/* III. ALASAN CUTI */}
                <View style={styles.section}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={[styles.cellHeader, { width: "100%" }]}><Text>III.    ALASAN CUTI</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "100%", minHeight: 18, paddingLeft: 15 }]}><Text>{data.reason}</Text></View>
                        </View>
                    </View>
                </View>

                {/* IV. LAMANYA CUTI */}
                <View style={styles.section}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={[styles.cellHeader, { width: "100%" }]}><Text>IV.    LAMANYA CUTI</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "12%", textAlign: "center" }]}><Text>Selama   {data.duration}</Text></View>
                            <View style={[styles.cell, { width: "20%", textAlign: "center" }]}>
                                <Text>
                                    ({data.durationUnit === "Hari" ? "hari" : <Text style={{ textDecoration: "line-through" }}>hari</Text>}/
                                    {data.durationUnit === "Bulan" ? "bulan" : <Text style={{ textDecoration: "line-through" }}>bulan</Text>}/
                                    {data.durationUnit === "Tahun" ? "tahun" : <Text style={{ textDecoration: "line-through" }}>tahun</Text>})*
                                </Text>
                            </View>
                            <View style={[styles.cell, { width: "13%", textAlign: "center" }]}><Text>mulai tanggal</Text></View>
                            <View style={[styles.cell, { width: "22%", fontFamily: "Helvetica-Bold", textAlign: "center" }]}><Text>{formatDate(data.startDate)}</Text></View>
                            <View style={[styles.cell, { width: "8%", textAlign: "center" }]}><Text>s/d</Text></View>
                            <View style={[styles.cell, { width: "25%", fontFamily: "Helvetica-Bold", textAlign: "center" }]}><Text>{formatDate(data.endDate)}</Text></View>
                        </View>
                    </View>
                </View>

                {/* V. CATATAN CUTI */}
                <View style={styles.section}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={[styles.cellHeader, { width: "60%" }]}><Text>V.    CATATAN CUTI***</Text></View>
                            <View style={[styles.cell, { width: "40%" }]}><Text></Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "5%", borderRightWidth: 0 }]}><Text>1.</Text></View>
                            <View style={[styles.cell, { width: "55%" }]}><Text>Cuti Tahunan</Text></View>
                            <View style={[styles.cell, { width: "5%", borderRightWidth: 0 }]}><Text>2.</Text></View>
                            <View style={[styles.cell, { width: "35%" }]}><Text>Cuti Besar</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "8%" }]}><Text>Tahun</Text></View>
                            <View style={[styles.cell, { width: "10%" }]}><Text>Sisa</Text></View>
                            <View style={[styles.cell, { width: "42%", textAlign: "center" }]}><Text>Keterangan</Text></View>
                            <View style={[styles.cell, { width: "5%", borderRightWidth: 0 }]}><Text>3.</Text></View>
                            <View style={[styles.cell, { width: "35%" }]}><Text>Cuti Sakit</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "8%" }]}><Text>N-2</Text></View>
                            <View style={[styles.cell, { width: "10%" }]}><Text>{data.remainingN2} hari</Text></View>
                            <View style={[styles.cell, { width: "42%" }]}><Text></Text></View>
                            <View style={[styles.cell, { width: "5%", borderRightWidth: 0 }]}><Text>4.</Text></View>
                            <View style={[styles.cell, { width: "35%" }]}><Text>Cuti Melahirkan</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "8%" }]}><Text>N-1</Text></View>
                            <View style={[styles.cell, { width: "10%" }]}><Text>{data.remainingN1} hari</Text></View>
                            <View style={[styles.cell, { width: "42%", borderBottomWidth: 0 }]}><Text>{data.leaveNotes ? data.leaveNotes.split('\n')[0] || '' : ''}</Text></View>
                            <View style={[styles.cell, { width: "5%", borderRightWidth: 0 }]}><Text>5.</Text></View>
                            <View style={[styles.cell, { width: "35%" }]}><Text>Cuti Karena Alasan Penting</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "8%" }]}><Text>N</Text></View>
                            <View style={[styles.cell, { width: "10%" }]}><Text>{data.remainingN} hari</Text></View>
                            <View style={[styles.cell, { width: "42%" }]}><Text>{data.leaveNotes ? data.leaveNotes.split('\n')[1] || '' : ''}</Text></View>
                            <View style={[styles.cell, { width: "5%", borderRightWidth: 0 }]}><Text>6.</Text></View>
                            <View style={[styles.cell, { width: "35%" }]}><Text>Cuti di Luar Tanggungan Negara</Text></View>
                        </View>
                    </View>
                </View>

                {/* VI. ALAMAT SELAMA MENJALANKAN CUTI */}
                <View style={styles.section}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={[styles.cellHeader, { width: "100%" }]}><Text>VI.    ALAMAT SELAMA MENJALANKAN CUTI</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "45%", borderBottomWidth: 0 }]}><Text></Text></View>
                            <View style={[styles.cell, { width: "15%" }]}><Text>No. Telpon</Text></View>
                            <View style={[styles.cell, { width: "40%" }]}><Text>{data.phoneNumber}</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "45%", borderBottomWidth: 0 }]}><Text>{data.addressDuringLeave}</Text></View>
                            <View style={[styles.cell, { width: "55%", textAlign: "right", borderBottomWidth: 0 }]}><Text>Hormat Saya,</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "45%", minHeight: 40 }]}><Text></Text></View>
                            <View style={[styles.cell, { width: "55%", textAlign: "right", paddingTop: 50 }]}>
                                <Text style={styles.signatureName}>{data.employee.name.toUpperCase()}</Text>
                                <Text style={{ fontSize: 8 }}>NIP.{data.employee.nip}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* VII. PERTIMBANGAN ATASAN LANGSUNG */}
                <View style={[styles.section]}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={[styles.cellHeader, { width: "100%" }]}><Text>VII.    PERTIMBANGAN ATASAN LANGSUNG**</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "25%", textAlign: "center" }]}><Text>DISETUJUI</Text></View>
                            <View style={[styles.cell, { width: "25%", textAlign: "center" }]}><Text>PERUBAHAN****</Text></View>
                            <View style={[styles.cell, { width: "25%", textAlign: "center" }]}><Text>DITANGGUHKAN****</Text></View>
                            <View style={[styles.cell, { width: "25%", textAlign: "center" }]}><Text>TIDAK DISETUJUI****</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "50%", minHeight: 50 }]}><Text>Catatan :</Text></View>
                            <View style={[styles.cell, { width: "50%", textAlign: "right", paddingTop: 50 }]}>
                                <Text style={styles.signatureName}>{data.supervisorName.toUpperCase()}</Text>
                                <Text style={{ fontSize: 8 }}>NIP. {data.supervisorNip}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* VIII. KEPUTUSAN PEJABAT */}
                <View style={styles.section}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={[styles.cellHeader, { width: "100%" }]}><Text>VIII.    KEPUTUSAN PEJABAT YANG BERWENANG MEMBERIKAN CUTI**</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "25%", textAlign: "center" }]}><Text>DISETUJUI</Text></View>
                            <View style={[styles.cell, { width: "25%", textAlign: "center" }]}><Text>PERUBAHAN****</Text></View>
                            <View style={[styles.cell, { width: "25%", textAlign: "center" }]}><Text>DITANGGUHKAN****</Text></View>
                            <View style={[styles.cell, { width: "25%", textAlign: "center" }]}><Text>TIDAK DISETUJUI****</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={[styles.cell, { width: "50%", minHeight: 55 }]}><Text>Catatan :</Text></View>
                            <View style={[styles.cell, { width: "50%", textAlign: "right", paddingTop: 2 }]}>
                                <Text>Kepala,</Text>
                                <View style={{ marginTop: 50 }}>
                                    <Text style={styles.signatureName}>{data.officialName.toUpperCase()}</Text>
                                    <Text style={{ fontSize: 8 }}>NIP. {data.officialNip}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Catatan */}
                <View style={styles.notes}>
                    <Text>Catatan</Text>
                    <Text>*        Coret yang tidak perlu</Text>
                    <Text>**       Pilih salah satu dengan memberikan tanda centang (V)</Text>
                    <Text>***      diisi oleh pejabat yang menangani bidang kepegawaian sebelum PNS mengajukan cuti</Text>
                    <Text>****     diberi tanda centang dan alasan</Text>
                    <Text>N        = Cuti tahun berjalan</Text>
                    <Text>N-1      = Sisa cuti 1 tahun sebelumnya</Text>
                    <Text>N-2      = Sisa cuti 2 tahun sebelumnya</Text>
                </View>
            </Page>
        </Document>
    );
}
