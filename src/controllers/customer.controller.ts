import { NextFunction, Request, Response, response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function customerGetAll(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        product: true,
        productType: true,
        hksRecords: true,
      },
    });
    if (customers.length > 0) {
      res.json({ customers });
    } else {
      throw new Error("Could not find customers");
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function customerDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.params.customerID) {
      const customerID = req.params.customerID;

      const customer = await prisma.customer.findFirst({
        include: {
          product: true,
          productType: true,
          hksRecords: true,
        },
        where: { id: Number(customerID) },
      });
      console.log({ customers: customer });
      if (customer) res.json({ customers: customer });
      else res.json({ error: "Customer not found" });
    }
  } catch (error) {
    res.json({ error: error });
  }
}

export async function customerCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, city, county, productID, productTypeID, billType } =
      req.query;
    if (
      name &&
      city &&
      county &&
      productID &&
      productTypeID &&
      billType &&
      typeof name === "string" &&
      typeof city === "string" &&
      typeof county === "string" &&
      typeof billType === "string"
    ) {
      const createdCustomer = await prisma.customer.create({
        include: {
          product: true,
          productType: true,
          hksRecords: true,
        },
        data: {
          name: name,
          city: city,
          county: county,
          productID: Number(productID),
          productTypeID: Number(productTypeID),
          billType: billType,
        },
      });
      if (!createdCustomer) {
        throw new Error("Customer create process failed");
      } else {
        res.json({ createdCustomer });
      }
    } else {
      throw new Error("Parameters missing or invalid type");
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function customerUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.customerID) {
      throw new Error("Parameters missing or invalid type");
    }
    const customerID = req.params.customerID;
    const props = req.body;
    const updateOpts: { [id: string]: any } = {};
    const allowedColumns = [
      "name",
      "city",
      "county",
      "productID",
      "productTypeID",
      "billType",
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
    const customer = await prisma.customer.findFirst({
      where: { id: Number(customerID) },
    });
    if (!customer) throw new Error("Customer update process failed");
    const updatedCustomer = await prisma.customer.update({
      include: {
        product: true,
        productType: true,
        hksRecords: true,
      },
      where: { id: Number(customerID) },
      data: updateOpts,
    });
    if (!updatedCustomer) {
      throw new Error("Customer update process failed");
    }
    res.json({ updatedCustomer });
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}

export async function customerDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.customerID) {
      throw new Error("Parameters missing or invalid type");
    }
    const customerID = req.params.customerID;
    const customer = await prisma.customer.findFirst({
      where: { id: Number(customerID) },
    });
    if (!customer) throw new Error("Customer delete process failed");

    const deletedCustomer = await prisma.customer.delete({
      include: {
        product: true,
        productType: true,
        hksRecords: true,
      },
      where: {
        id: Number(customerID),
      },
    });
    if (!deletedCustomer) {
      throw new Error("Customer delete process failed");
    } else {
      res.json(deletedCustomer);
    }
  } catch (e) {
    res.json({ error: (<Error>e).message });
  }
}
