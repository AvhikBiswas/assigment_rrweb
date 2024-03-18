import express from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { dataFolderName } from "./constants.js";

const __dirname = path.resolve();

const startHttpServer = () => {
  const app = express();
  app.use(express.static("public"));

  app.get("/rrweb-events", (req, res) => {
    res.sendFile(__dirname + "/public/rrweb_events.html");
  });

  // Update the route handler to accept an id parameter
  app.get("/api-rrweb-events", (req, res) => {
    const id = req.query.id; // Get the id query parameter
    if (!id) {
      return res.status(400).send("Missing id parameter");
    }
    return res.send(fetchRrwebEvents(parseInt(id))); // Parse id to integer
  });

  app.get("/session", (req, res) => {
    console.log("hitted----->");
    const sessionId = uuidv4();
    res.status(201).json({
      sessionId,
    });
  });

  const port = 3000;
  app.listen(port, () => console.log(`Server listening on port ${port}`));
};

// Modify the fetchRrwebEvents function to accept an id parameter
const fetchRrwebEvents = (id) => {
  const dataFilePath = path.join(dataFolderName, id.toString());
  const rrwebEvents = fs.readFileSync(dataFilePath, "utf-8");
  return rrwebEvents
    .split("\n")
    .filter((line) => line.length > 0)
    .map((ff) => JSON.parse(ff));
};

export { startHttpServer };
