function getBaseDomain(url) {
  const hostname = new URL(url).hostname;
  return hostname.replace(/^www\./, "");
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.startsWith("http")
  ) {
    chrome.storage.local.get(["visitedUrls", "matchMode"], (data) => {
      const visitedUrls = data.visitedUrls || [];
      const matchMode = data.matchMode || "Exact"; // fallback to "Exact"

      let target;
      if (matchMode === "Exact") {
        target = tab.url;
      } else if (matchMode === "Fuzzy") {
        target = getBaseDomain(tab.url);
      }

      const hasVisited = visitedUrls.includes(target);

      if (hasVisited) {
        console.log("You've visited this site before.");
        chrome.action.setBadgeText({ text: "Seen", tabId: tab.id });
        chrome.action.setBadgeBackgroundColor({ color: "#4CAF50" });
      } else {
        console.log("This is your first time visiting.");
        chrome.action.setBadgeText({ text: "", tabId: tab.id });

        // Save this URL as visited
        visitedUrls.push(target);
        chrome.storage.local.set({ visitedUrls });
      }
    });
  }
});
