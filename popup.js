// Load and reflect current mode
chrome.storage.local.get("matchMode", (data) => {
  const mode = data.matchMode || "Exact"; // Default to "Exact" if not set
  document.querySelector(`input[value="${mode}"]`).checked = true;
});

// Listen for changes in match mode
document.querySelectorAll('input[name="mode"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    const selected = event.target.value;
    chrome.storage.local.set({ matchMode: selected });
  });
});
