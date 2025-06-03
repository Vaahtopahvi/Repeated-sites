

//Background script for detecting site visits
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    console.log("URL visited:", tab.url);

    // Check if the URL is already in history
    chrome.history.search({ text: tab.url, maxResults: 1 }, (results) => {
      if (results.length > 0) {
        console.log("You've visited this site before.");
      } else {
        console.log("This is your first time visiting.");
      }
    });
  }
});
