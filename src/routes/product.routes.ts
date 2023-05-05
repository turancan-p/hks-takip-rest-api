import express from "express";
import * as productController from "../controllers/product.controller";

export default (router: express.Router) => {
  router.get("/products", productController.productGetAll);
  router.get("/products/:productID", productController.productDetails);
  router.post("/products", productController.productCreate);
  router.patch("/products/:productID", productController.productUpdate);
  router.delete("/products/:productID", productController.productDelete);
};
