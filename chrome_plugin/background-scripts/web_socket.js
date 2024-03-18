let webSocket = null;

chrome.storage.local.set({ sessionId: "" }, function () {
  console.log("Data saved");
});

function connectToWebSocket() {
  webSocket = new WebSocket("ws://localhost:3008");

  webSocket.onopen = () => {
    console.log("WebSocket connected");
    changeIcon("../icons/server_up.png");
  };

  webSocket.onerror = (err) => {
    console.error("WebSocket error:", err);
    changeIcon("../icons/server_down.png");
  };
}

// Initial connection attempt
connectToWebSocket();

// Reconnect every 5 seconds if not connected
setInterval(() => {
  if (webSocket === null || webSocket.readyState !== WebSocket.OPEN) {
    connectToWebSocket();
  }
}, 5000);

// Message listener from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("WebSocket", WebSocket);

  chrome.storage.local.get(["sessionId"], function (result) {
    console.log("Value currently is " + result.sessionId);
    const idValue = result.sessionId;

    if (
      idValue !== "" &&
      webSocket &&
      webSocket.readyState === WebSocket.OPEN
    ) {
      console.log({ payload: message.toString() });
      webSocket.send(JSON.stringify(message));
    } else {
      console.log("WebSocket not ready or sessionId is empty, data ignored");
    }
  });
});

function changeIcon(imageIcon) {
  chrome.action.setIcon({ path: imageIcon });
}
