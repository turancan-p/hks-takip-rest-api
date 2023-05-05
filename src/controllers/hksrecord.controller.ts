import { NextFunction, Request, Response, response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function hksRecordGetAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const hksRecords = await prisma.hksRecord.findMany({
      include: {
        customer: true,
        licensePlate: true,

        cksOwner: true,
        product: true,
        productType: true,
      },
    });
    if (hksRecords.length === 0)
      throw new Error("Could not find any hks records");
    res.json({ hksRecords });
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function hksRecordDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.params.hksRecordID && typeof req.params.hksRecordID === "string") {
      const { hksRecordID } = req.params;

      const hksRecord = await prisma.hksRecord.findFirst({
        include: {
          cksOwner: true,
          product: true,
          productType: true,
          customer: true,
          licensePlate: true,
        },
        where: {
          id: Number(hksRecordID),
        },
      });
      if (!hksRecord) throw new Error("HksRecord not found");
      else res.json({ hksRecord });
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function hksRecordCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      customerID,
      cksOwnerID,
      productID,
      productTypeID,
      city,
      county,
      licensePlateID,
      hksKg,
      hksPrice,
    } = req.query;
    if (
      customerID &&
      city &&
      county &&
      cksOwnerID &&
      hksKg &&
      licensePlateID &&
      hksPrice &&
      productID &&
      productTypeID &&
      typeof customerID === "string" &&
      typeof city === "string" &&
      typeof county === "string" &&
      typeof cksOwnerID === "string" &&
      typeof hksKg === "string" &&
      typeof licensePlateID === "string" &&
      typeof hksPrice === "string" &&
      typeof productID === "string" &&
      typeof productTypeID === "string"
    ) {
      customerID;
      const createdCksOwner = await prisma.hksRecord.create({
        include: {
          cksOwner: true,
          product: true,
          productType: true,
          customer: true,
          licensePlate: true,
        },
        data: {
          registerDate: new Date(Date.now()),
          customerID: Number(customerID),
          cksOwnerID: Number(cksOwnerID),
          productID: Number(productID),
          productTypeID: Number(productTypeID),
          city: city,
          county: county,
          hksKg: Number(hksKg),
          hksPrice: Number(hksPrice),
          licensePlateID: Number(licensePlateID),
        },
      });
      if (!createdCksOwner) throw new Error("hksRecord create process failed");
      else res.json({ createdCksOwner });
    } else {
      throw new Error("Query parameters is missing or invalid type");
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function hksRecordUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.hksRecordID) {
      throw new Error("Parameters missing or invalid type");
    }
    const { hksRecordID } = req.params;
    const props = req.body;
    const updateOpts: { [id: string]: any } = {};
    const allowedColumns = [
      "registerDate",
      "customerID",
      "city",
      "county",
      "cksOwnerID",
      "hksKg",
      "licensePlate",
      "hksPrice",
      "productID",
      "productTypeID",
    ];
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        const newData = props[key];
        const { propName, propValue } = newData;

        if (allowedColumns.includes(propName)) {
          updateOpts[propName] = propValue;
        }
      }
    }
    const hksRecord = await prisma.hksRecord.findFirst({
      where: { id: Number(hksRecordID) },
    });
    if (!hksRecord) throw new Error("hksRecord update failed");
    const updatedHksRecord = await prisma.hksRecord.update({
      include: {
        cksOwner: true,
        product: true,
        productType: true,
        customer: true,
        licensePlate: true,
      },
      where: { id: Number(hksRecordID) },
      data: updateOpts,
    });
    if (!updatedHksRecord) {
      throw new Error("hksRecord update process failed");
    }
    res.json({ updatedHksRecord });
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function hksRecordDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.params.hksRecordID && typeof req.params.hksRecordID === "string") {
      const { hksRecordID } = req.params;

      const hksRecord = await prisma.hksRecord.findFirst({
        where: {
          id: Number(hksRecordID),
        },
      });
      if (!hksRecord) throw new Error("hksRecord not found");
      else {
        const deletedHksRecord = await prisma.hksRecord.delete({
          include: {
            cksOwner: true,
            product: true,
            productType: true,
            customer: true,
            licensePlate: true,
          },
          where: { id: Number(hksRecordID) },
        });
        if (!deletedHksRecord)
          throw new Error("hksRecord delete process failed");
        else res.json({ deletedHksRecord });
      }
    } else {
      throw new Error("Parameter missing or invalid type");
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}
