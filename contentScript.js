// Try both selectors just in case
let title =
  document.querySelector("div[data-cy='question-title']")?.innerText ||
  document.querySelector("h1")?.innerText;

if (title) {
  chrome.storage.local.set({ problemTitle: title });
  console.log("Stored title:", title);
} else {
  console.log("Problem title not found.");
}
