import express from "express";
import * as productTypeController from "../controllers/productType.controller";

export default (router: express.Router) => {
  router.get("/product-types", productTypeController.productTypeGetAll);
  router.get("/product-types/:productTypeID", productTypeController.productTypeDetails);
  router.post("/product-types", productTypeController.productTypeCreate);
  router.patch("/product-types/:productTypeID", productTypeController.productTypeUpdate);
  router.delete("/product-types/:productTypeID", productTypeController.productTypeDelete);
};
