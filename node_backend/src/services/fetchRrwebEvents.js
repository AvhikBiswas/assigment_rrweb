import { dataFolderName } from "../constants";

const fetchRrwebEvents = (id) => {
    const dataFilePath = path.join(dataFolderName, id.toString());
    const rrwebEvents = fs.readFileSync(dataFilePath, "utf-8");
    return rrwebEvents
      .split("\n")
      .filter((line) => line.length > 0)
      .map((ff) => JSON.parse(ff));
  };
  export default fetchRrwebEvents;