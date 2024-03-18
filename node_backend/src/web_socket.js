import { WebSocketServer } from "ws";
import fs from "fs-extra";
import { dataFolderName } from "./constants.js";
import path from "path";

const startWebSocketServer = () => {
  const wss = new WebSocketServer({ port: 3008 });
  wss.on("connection", (ws) => {
    console.log("WebSocket connection established.");

    // Handle incoming messages
    ws.on("message", (message) => {
      const payload = JSON.parse(message.toString());
      processPayload(payload);
    });
  });
};

const countFilesInFolder = () => {
  try {
    const folderPath = path.join(dataFolderName);
    const files = fs.readdirSync(folderPath);
    return files.length;
  } catch (error) {
    console.error("Error counting files in folder:", error);
    return -1; // Return -1 to indicate an error
  }
};

let lastUrl = null;
let id = countFilesInFolder();

const processPayload = (payload) => {
  const { type, url, data } = payload;
  // console.log("*".repeat(80));
  // console.log({ type, url, payload });
  // console.log("*".repeat(80));

  if (type !== "rrweb events") {
    return;
  }
  const jsonData = JSON.parse(data);

  let dataFilePath;
  if (url === lastUrl) {
    console.log("url is This----------->", url);
    // Simply append to the same file;  No change
    dataFilePath = path.join(dataFolderName, id.toString());
    fs.writeJsonSync(dataFilePath, jsonData, { flag: "a" });
  }
  if (url !== lastUrl) {
    console.log("url Changed", url, lastUrl);
    id++;
    dataFilePath = path.join(dataFolderName, id.toString());
    fs.writeJsonSync(dataFilePath, jsonData); // This would empty the files if there's already content
    lastUrl = url;
  }
};

export { startWebSocketServer };
