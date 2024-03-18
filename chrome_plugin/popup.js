async function fetchSession() {
    try {
      const response = await fetch("http://localhost:3000/api/v1/session");
      if (!response.ok) {
        throw new Error("Failed to fetch session");
      }
      const data = await response.json(); // Parse response JSON
      const sessionIdData = data.sessionId; // Assign sessionId from response
      chrome.storage.local.set({ sessionId: sessionIdData }, function () {
        console.log("Data saved");
      });
  
      console.log("data------->", data.sessionId);
      return true;
    } catch (error) {
      console.error("Failed to fetch session:", error);
      return null;
    }
  }
  
  function stopSession() {
    chrome.storage.local.set({ sessionId: "" }, function () {
      console.log("Data Removed");
    });
  
    return true;
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const startSessionBtn = document.getElementById("startSessionBtn");
    const stopSessionBtn = document.getElementById("stopSessionBtn");
  
    startSessionBtn.addEventListener("click", async function () {
      const response = await fetchSession();
      console.log("Session started successfully");
      // Emit data from the active tab immediately after starting the session
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        const url = activeTab.url;
        const data = { url: url, type: 'rrweb events', data: '' };
        chrome.runtime.sendMessage(data);
      });
    });
  
    stopSessionBtn.addEventListener("click", function () {
      const response = stopSession();
      if (response) {
        console.log("Session stopped successfully");
      }
    });
  });
  