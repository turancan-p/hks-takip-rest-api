import express from "express";
import * as cksOwnerController from "../controllers/cksowner.controller";

export default (router: express.Router) => {
  router.get("/cks-owners", cksOwnerController.cksOwnerGetAll);
  router.get("/cks-owners/:cksOwnerID", cksOwnerController.cksOwnerDetails);
  router.post("/cks-owners", cksOwnerController.cksOwnerCreate);
  router.patch("/cks-owners/:cksOwnerID", cksOwnerController.cksOwnerUpdate);
  router.delete("/cks-owners/:cksOwnerID", cksOwnerController.cksOwnerDelete);
};
