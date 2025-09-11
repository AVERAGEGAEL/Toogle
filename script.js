const addressBar = document.getElementById("address-bar");
const goBtn = document.getElementById("go-btn");
const searchBox = document.getElementById("search-box");
const homepage = document.getElementById("homepage");
const resultsDiv = document.getElementById("results");
const fullscreenBtn = document.getElementById("fullscreen-btn");

// DuckDuckGo free API endpoint
const SEARCH_API = "https://api.duckduckgo.com/?q=";

function search(query) {
  if (!query) return;

  homepage.style.display = "none";
  resultsDiv.style.display = "block";
  resultsDiv.innerHTML = "<p>Loading results...</p>";

  fetch(SEARCH_API + encodeURIComponent(query) + "&format=json&pretty=1")
    .then(res => res.json())
    .then(data => {
      resultsDiv.innerHTML = "";
      if (data.RelatedTopics && data.RelatedTopics.length > 0) {
        data.RelatedTopics.forEach(item => {
          if (item.Text && item.FirstURL) {
            const div = document.createElement("div");
            div.className = "result";
            div.innerHTML = `<a href="${item.FirstURL}" target="_blank">${item.Text}</a>`;
            resultsDiv.appendChild(div);
          }
        });
      } else {
        resultsDiv.innerHTML = "<p>No results found.</p>";
      }
    })
    .catch(() => {
      resultsDiv.innerHTML = "<p>Error loading results.</p>";
    });
}

function handleInput(input) {
  if (!input) return;

  // If input looks like a URL
  if (input.includes(".") && !input.includes(" ")) {
    if (!input.startsWith("http://") && !input.startsWith("https://")) {
      input = "https://" + input;
    }
    window.open(input, "_blank"); // open site in new tab
  } else {
    // Otherwise, do a search
    search(input);
  }
}

// Address bar actions
goBtn.addEventListener("click", () => handleInput(addressBar.value));
addressBar.addEventListener("keydown", e => {
  if (e.key === "Enter") handleInput(addressBar.value);
});

// Homepage search box
searchBox.addEventListener("keydown", e => {
  if (e.key === "Enter") search(searchBox.value);
});

// Fullscreen
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
