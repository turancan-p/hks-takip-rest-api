import { NextFunction, Request, Response, response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function cksOwnerGetAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cksOwners = await prisma.cksOwner.findMany({
      include: {
        product: true,
        productType: true,
        hksRecords: true,
      },
    });
    if (cksOwners.length === 0) throw new Error("Could not find any cksOwner");
    else res.json({ cksOwners });
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function cksOwnerDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.params.cksOwnerID && typeof req.params.cksOwnerID === "string") {
      const { cksOwnerID } = req.params;

      const cksOwner = await prisma.cksOwner.findFirst({
        include: {
          product: true,
          productType: true,
          hksRecords: true,
        },
        where: {
          id: Number(cksOwnerID),
        },
      });
      if (!cksOwner) throw new Error("CksOwner not found");
      else res.json({ cksOwner });
    } else {
      throw new Error("Parameter missing or invalid type");
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function cksOwnerCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, city, county, tckNo, cksKg, productID, productTypeID } =
      req.query;
    if (
      name &&
      city &&
      county &&
      tckNo &&
      cksKg &&
      productID &&
      productTypeID &&
      typeof name === "string" &&
      typeof city === "string" &&
      typeof county === "string" &&
      typeof tckNo === "string" &&
      typeof cksKg === "string" &&
      typeof productID === "string" &&
      typeof productTypeID === "string"
    ) {
      const createdCksOwner = await prisma.cksOwner.create({
        include: {
          product: true,
          productType: true,
          hksRecords: true,
        },
        data: {
          name: name,
          city: city,
          county: county,
          tckNo: tckNo,
          cksKg: Number(cksKg),
          productID: Number(productID),
          productTypeID: Number(productTypeID),
        },
      });
      if (!createdCksOwner) throw new Error("CksOwner create process failed");
      else res.json({ createdCksOwner });
    } else {
      throw new Error("Query parameters is missing or invalid type");
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function cksOwnerUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.cksOwnerID) {
      throw new Error("Parameters missing or invalid type");
    }
    const { cksOwnerID } = req.params;
    const props = req.body;
    const updateOpts: { [id: string]: any } = {};
    const allowedColumns = [
      "name",
      "city",
      "county",
      "tckNo",
      "cksKg",
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
    const cksOwner = await prisma.cksOwner.findFirst({
      where: { id: Number(cksOwnerID) },
    });
    if (!cksOwner) throw new Error("Cks owner update failed");
    const updatedCksOwner = await prisma.cksOwner.update({
      include: {
        product: true,
        productType: true,
        hksRecords: true,
      },
      where: { id: Number(cksOwnerID) },
      data: updateOpts,
    });
    if (!updatedCksOwner) {
      throw new Error("Customer update process failed");
    }
    res.json({ updatedCksOwner });
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function cksOwnerDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.params.cksOwnerID && typeof req.params.cksOwnerID === "string") {
      const { cksOwnerID } = req.params;

      const cksOwner = await prisma.cksOwner.findFirst({
        where: {
          id: Number(cksOwnerID),
        },
      });
      if (!cksOwner) throw new Error("CksOwner not found");
      else {
        const deletedCksOwner = await prisma.cksOwner.delete({
          include: {
            product: true,
            productType: true,
            hksRecords: true,
          },
          where: { id: Number(cksOwnerID) },
        });
        if (!deletedCksOwner) throw new Error("CksOwner delete process failed");
        else res.json({ deletedCksOwner });
      }
    } else {
      throw new Error("Parameter missing or invalid type");
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}
