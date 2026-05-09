const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("admin123", 12);

    const admin = await prisma.user.upsert({
        where: { email: "admin@lapas.go.id" },
        update: {},
        create: {
            email: "admin@lapas.go.id",
            password: hashedPassword,
            name: "Administrator",
        },
    });

    console.log("Admin user created:", admin);

    const officials = [
        {
            fullName: "Jalu Yuswa Panjang, A.Md.IP., S.H., M.Si.",
            name: "JALU YUSWA PANJANG",
            nip: "197312221998031001",
            position: "Kepala Kantor Wilayah",
        },
        {
            fullName: "Sastra Irawan, A.Md.IP., S.Sos., M.Si.",
            name: "SASTRA IRAWAN",
            nip: "197711052000121001",
            position: "Kepala Lapas",
        },
    ];

    for (const official of officials) {
        await prisma.signingOfficial.upsert({
            where: { nip: official.nip },
            update: official,
            create: official,
        });
    }

    console.log("Signing officials seeded");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
