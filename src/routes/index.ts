import express from "express";

import customerRoutes from "./customer.routes";
import productRoutes from "./product.routes";
import productTypeRoutes from "./productType.routes";
import cksOwnerRoutes from "./cksowner.routes";
import hksRecord from "./hksrecord.routes";
import licensePlate from "./licenseplate.routes";

const router = express.Router();

export default (): express.Router => {
  customerRoutes(router);
  productRoutes(router);
  productTypeRoutes(router);
  cksOwnerRoutes(router);
  hksRecord(router);
  licensePlate(router);
  return router;
};
