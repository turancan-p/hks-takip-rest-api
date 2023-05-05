import express from "express";
import http from "http";

import { config } from "./configs/config";
import routes from "./routes";

const baseApp = express();

/**Start server function */
const startServer = () => {
  baseApp.use(express.urlencoded({ extended: true }));
  baseApp.use(express.json());

  /**Logging request and response to console*/
  baseApp.use((req, res, next) => {
    const ip =
      <string>req.headers["x-forwarded-for"] ||
      <string>req.socket.remoteAddress ||
      "";
    console.log("ip:", ip);
    const realIp = ip.split(",")[0];
    console.log(
      `Incoming -> Method: [${req.method}] - Url: ${req.url} - IP: [${realIp}]`
    );

    res.on("finish", () => {
      console.log(
        `Finish -> Method: [${req.method}] - Url: ${req.url} - IP: [${realIp}] - Status: [${res.statusCode} - ${res.statusMessage}]`
      );
    });
    next();
  });

  /**Rules of API */
  baseApp.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

  /** Routes */
  baseApp.use("/", routes());

  /** Healtcheck */
  baseApp.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );

  /** Error handling */
  baseApp.use((req, res, next) => {
    const ip =
      <string>req.headers["x-forwarded-for"] ||
      <string>req.socket.remoteAddress ||
      "";
    const realIp = ip.split(",")[0];
    const error = new Error(`Page Not Found! - IP: [${realIp}]`);
    console.log(`Page Not Found! - IP: [${realIp}]`);

    return res.status(404).json({ message: error.message });
  });

  /**Create server */
  http
    .createServer(baseApp)
    .listen(config.ports.baseApp, () =>
      console.log("Server is runnging on port " + config.ports.baseApp)
    );
};

startServer();
