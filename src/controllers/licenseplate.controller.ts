import { NextFunction, Request, Response, response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function licensePlateGetAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const licensePlates = await prisma.licensePlate.findMany({
      include: {
        hksRecords: true,
      },
    });
    if (licensePlates.length === 0) {
      throw new Error("Could not find licensePlates");
    }
    res.json({ licensePlates });
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function licensePlateDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.params.licensePlateID) {
      const licensePlateID = req.params.licensePlateID;

      const licensePlate = await prisma.licensePlate.findFirst({
        include: {
          hksRecords: true,
        },
        where: { id: Number(licensePlateID) },
      });
      if (licensePlate) res.json({ licensePlate });
      else res.json({ error: "licensePlate not found" });
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function licensePlateCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { plate } = req.query;
    if (plate && typeof plate === "string") {
      const createdLicensePlate = await prisma.licensePlate.create({
        include: {
          hksRecords: true,
        },
        data: {
          plate,
        },
      });
      if (!createdLicensePlate) {
        throw new Error("licensePlate create process failed");
      } else {
        res.json({ createdLicensePlate });
      }
    } else {
      throw new Error("Query missing or invalid type");
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function licensePlateUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.licensePlateID) {
      throw new Error("Parameters missing or invalid type");
    }
    const licensePlateID = req.params.licensePlateID;
    const props = req.body;
    const updateOpts: { [id: string]: any } = {};
    const allowedColumns = ["plate"];
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        const newData = props[key];
        const { propName, propValue } = newData;

        if (allowedColumns.includes(propName)) {
          updateOpts[propName] = propValue;
        }
      }
    }
    const licensePlate = await prisma.licensePlate.findFirst({
      where: { id: Number(licensePlateID) },
    });
    if (!licensePlate) throw new Error("licensePlate not found");
    const updatedlicensePlate = await prisma.licensePlate.update({
      include: {
        hksRecords: true,
      },
      where: { id: Number(licensePlateID) },
      data: updateOpts,
    });
    if (!licensePlate) throw new Error("licensePlate update process failed");
    res.json({ updatedlicensePlate });
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function licensePlateDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.params.licensePlateID) {
      const licensePlateID = req.params.licensePlateID;

      const licensePlate = await prisma.licensePlate.findFirst({
        where: { id: Number(licensePlateID) },
      });
      if (!licensePlate) {
        throw new Error("licensePlate delete process failed");
      }
      const deletedlicensePlate = await prisma.licensePlate.delete({
        include: {
          hksRecords: true,
        },
        where: { id: Number(licensePlateID) },
      });
      if (!deletedlicensePlate) {
        throw new Error("licensePlate delete process failed");
      } else {
        res.json({ deletedlicensePlate });
      }
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}
