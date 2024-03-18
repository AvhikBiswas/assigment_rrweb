import path from "path";
import fetchRrwebEvents from "../services/fetchRrwebEvents.js";
const __dirname = path.resolve();

const rrwebEvents = (req, res) => {
  const id = req.query?.id; // Get the id query parameter
  try {
    if (!id) {
      return res.status(400).json({ error: "Missing id parameter" });
    }

    // Assuming fetchRrwebEvents function returns the rrweb events data as an array

    return res.send(fetchRrwebEvents(id));
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Something Went Wrong" });
  }
};
export default rrwebEvents;
