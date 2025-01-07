/*
Logging function to display to server terminal for debugging purposes
*/
const logRequest = (req, level = "INFO", message = "") => {
  const logMessage = `\n[${new Date().toISOString()}] [${level}] [${
    req.method
  }] [${req.originalUrl}] 
      [RequestID: ${req.id || "N/A"}]
      - Client IP: ${req.ip}
      - User Agent: ${req.headers["user-agent"]}
      - Request Params: ${JSON.stringify(req.query, null, 2)}
      - Request Body: ${JSON.stringify(req.body, null, 2)}
      Message: ${message || "Request processed successfully"}
    `;

  if (level === "ERROR") {
    console.error(logMessage);
  } else if (level === "WARN") {
    console.warn(logMessage);
  } else {
    console.info(logMessage);
  }
};

module.exports = logRequest;
