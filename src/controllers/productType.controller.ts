import { NextFunction, Request, Response, response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function productTypeGetAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const productTypes = await prisma.productType.findMany({
      include: {
        product: true,
      },
    });
    if (productTypes.length === 0) throw new Error("ProductTypes not found");
    else res.json({ productTypes });
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function productTypeDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.productTypeID)
      throw new Error("Parameters missing or invalid parameters type");
    const productTypeID = req.params.productTypeID;

    const productTypeDetails = await prisma.productType.findFirst({
      include: {
        product: true,
      },
      where: { id: Number(productTypeID) },
    });
    if (!productTypeDetails) throw new Error("ProductType not found");
    else res.json({ productTypeDetails });
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function productTypeCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, productID } = req.query;
    if (
      name &&
      productID &&
      typeof productID === "string" &&
      typeof name === "string"
    ) {
      const createdProductType = await prisma.productType.create({
        include: {
          product: true,
        },
        data: {
          name: name,
          productID: Number(productID),
        },
      });
      if (!createdProductType)
        throw new Error("ProductType create process failed");
      else res.json({ createdProductType });
    } else {
      throw new Error("Query missing or invalid type");
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function productTypeUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.productTypeID) {
      throw new Error("Parameters missing or invalid type");
    }
    const productTypeID = req.params.productTypeID;
    const props = req.body;
    const updateOpts: { [id: string]: any } = {};
    const allowedColumns = ["name", "productID"];
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        const newData = props[key];
        const { propName, propValue } = newData;

        if (allowedColumns.includes(propName)) {
          updateOpts[propName] = propValue;
        }
      }
    }
    const productType = await prisma.productType.findFirst({
      where: { id: Number(productTypeID) },
    });
    if (!productType) throw new Error("ProductType not found");
    const updatedProductType = await prisma.productType.update({
      include: {
        product: true,
      },
      where: { id: Number(productTypeID) },
      data: updateOpts,
    });
    if (!updatedProductType)
      throw new Error("ProductType update process failed");
    res.json({ updatedProductType });
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function productTypeDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (
      req.params.productTypeID &&
      typeof req.params.productTypeID === "string"
    ) {
      const { productTypeID } = req.params;

      const productType = await prisma.productType.findFirst({
        where: { id: Number(productTypeID) },
      });
      if (!productType) throw new Error("ProductType not found");

      const deletedProductType = await prisma.productType.delete({
        include: {
          product: true,
        },
        where: { id: Number(productTypeID) },
      });
      if (!deletedProductType)
        throw new Error("ProductType delete process failed");
      else res.json({ deletedProductType });
    } else {
      throw new Error("Parameters missing or invalid type");
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}
