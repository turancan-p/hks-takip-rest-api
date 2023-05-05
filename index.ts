import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //   await prisma.cksOwner.create({
  //     data:{
  //         name: "Turan Can Pamuk",
  //         country: "Mersin",
  //         district: "Erdemli",
  //         tckNo: "12345678912",
  //         cksKg: 100000,
  //         remainingKg: 100000,
  //         productID: 1,
  //         productTypeID: 2,
  //     }
  //   })
  //   await prisma.cksOwner.create({
  //     data:{
  //         name: "Süleyman Keş",
  //         country: "Mersin",
  //         district: "Mezitli",
  //         tckNo: "12345678912",
  //         cksKg: 80000,
  //         remainingKg: 80000,
  //         productID: 1,
  //         productTypeID: 3,
  //     }
  //   })
  // await prisma.hksRecord.create({
  //   data: {
  //     customerID: 1,
  //     cksOwnerID: 1,
  //     registerDate: new Date(Date.now()),
  //     country: "Mersin",
  //     district: "Erdemli",
  //     productID: 1,
  //     productTypeID: 1,
  //     licensePlate: "33V1344",
  //     kg: 12500,
  //     price: 12.5,
  //   },
  // });
  console.log("test")
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
