import express from "express";
import * as hksRecordController from "../controllers/hksrecord.controller";

export default (router: express.Router) => {
  router.get("/hks-records", hksRecordController.hksRecordGetAll);
  router.get("/hks-records/:hksRecordID", hksRecordController.hksRecordDetails);
  router.post("/hks-records", hksRecordController.hksRecordCreate);
  router.patch(
    "/hks-records/:hksRecordID",
    hksRecordController.hksRecordUpdate
  );
  router.delete(
    "/hks-records/:hksRecordID",
    hksRecordController.hksRecordDelete
  );
};
