import express from "express";
import fs from "fs";
import path from "path";
import { dataFolderName } from "./constants.js";
import apiRoutes from "../src/routes/index.js";
import fetchRrwebEvents from "./services/fetchRrwebEvents.js";

const __dirname = path.resolve();

const startHttpServer = () => {
  const app = express();
  app.use(express.static("public"));
  // api
  app.use("/api", apiRoutes);

  const port = 3000;
  app.listen(port, () => console.log(`Server listening on port ${port}`));
};

export { startHttpServer };
