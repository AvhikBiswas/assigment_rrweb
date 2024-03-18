import { dataFolderName } from "../constants.js";
import fs from "fs";
import path from "path";

const fetchRrwebEvents = (id) => {
  console.log("dataFolderName:", dataFolderName);
  console.log("id:", id);

  try {
    const dataFilePath = path.join(dataFolderName, id.toString());

    // Check if the file exists
    if (!fs.existsSync(dataFilePath)) {
      console.error("File not found:", dataFilePath);
      return []; // Return empty array if file doesn't exist
    }

    const rrwebEvents = fs.readFileSync(dataFilePath, "utf-8");

    // Check if the file is empty
    if (!rrwebEvents.trim()) {
      console.error("File is empty:", dataFilePath);
      return [];
    }

    // Parse and return the RRWeb events
    return rrwebEvents
      .split("\n")
      .filter((line) => line.length > 0)
      .map((ff) => JSON.parse(ff));
  } catch (error) {
    console.error("Error fetching RRWeb events:", error);
    return []; // Return empty array if any error occurs
  }
};

export default fetchRrwebEvents;
