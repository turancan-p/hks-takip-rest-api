import express from "express";
import * as userController from "../controllers/customer.controller";

export default (router: express.Router) => {
  router.get("/customers", userController.customerGetAll);
  router.get("/customers/:customerID", userController.customerDetails);
  router.post("/customers", userController.customerCreate);
  router.patch("/customers/:customerID", userController.customerUpdate);
  router.delete("/customers/:customerID", userController.customerDelete);
};
