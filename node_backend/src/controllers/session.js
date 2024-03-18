import getSessionID from "../services/getSessionID.js";

const session = (req, res) => {
  const sessionIdData = getSessionID();
  res.status(201).json({
    sessionId: sessionIdData,
  });
};

export default session;