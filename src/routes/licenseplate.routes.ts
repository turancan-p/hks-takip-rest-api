import express from "express";
import * as licensePlate from "../controllers/licenseplate.controller";

export default (router: express.Router) => {
  router.get("/license-plate", licensePlate.licensePlateGetAll);
  router.get("/license-plate/:licensePlateID", licensePlate.licensePlateDetails);
  router.post("/license-plate", licensePlate.licensePlateCreate);
  router.patch("/license-plate/:licensePlateID", licensePlate.licensePlateUpdate);
  router.delete("/license-plate/:licensePlateID", licensePlate.licensePlateDelete);
};
