import { NextFunction, Request, Response, response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function productGetAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await prisma.product.findMany({
      include: {
        productType: true,
      },
    });
    if (products.length === 0) {
      throw new Error("Could not find products");
    }
    res.json({ products });
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function productDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.params.productID) {
      const productID = req.params.productID;

      const product = await prisma.product.findFirst({
        include: {
          productType: true,
        },
        where: { id: Number(productID) },
      });
      if (product) res.json({ product });
      else res.json({ error: "Product not found" });
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function productCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name } = req.query;
    if (name && typeof name === "string") {
      const createdProduct = await prisma.product.create({
        include: {
          productType: true,
        },
        data: {
          name,
        },
      });
      if (!createdProduct) {
        throw new Error("Product create process failed");
      } else {
        res.json({ createdProduct });
      }
    } else {
      throw new Error("Query missing or invalid type");
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function productUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.productID) {
      throw new Error("Parameters missing or invalid type");
    }
    const productID = req.params.productID;
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
    const product = await prisma.product.findFirst({
      where: { id: Number(productID) },
    });
    if (!product) throw new Error("Product not found");
    const updatedProduct = await prisma.product.update({
      include: {
        productType: true,
      },
      where: { id: Number(productID) },
      data: updateOpts,
    });
    if (!updatedProduct) throw new Error("Product update process failed");
    res.json({ updatedProduct });
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function productDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.params.productID) {
      const productID = req.params.productID;

      const product = await prisma.product.findFirst({
        where: { id: Number(productID) },
      });
      if (!product) {
        throw new Error("Product delete process failed");
      }
      const deletedProduct = await prisma.product.delete({
        include: {
          productType: true,
        },
        where: { id: Number(productID) },
      });
      if (!deletedProduct) {
        throw new Error("Product delete process failed");
      } else {
        res.json({ deletedProduct });
      }
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}
