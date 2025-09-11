// Elements
const searchBox = document.getElementById("search-box");
const goBtn = document.getElementById("go-btn");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const homepage = document.getElementById("homepage");
const results = document.getElementById("results");

// Search function
async function doSearch(query) {
  if (!query.trim()) return;

  // Hide homepage and show results
  homepage.style.display = "none";
  results.style.display = "block";
  results.innerHTML = "<p>Searching...</p>";

  try {
    // Use DuckDuckGo's Instant Answer API (no key required)
    const res = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
    const data = await res.json();

    // Build results
    let html = `<h2>Results for "${query}"</h2>`;
    if (data.RelatedTopics && data.RelatedTopics.length > 0) {
      data.RelatedTopics.forEach(item => {
        if (item.Text && item.FirstURL) {
          html += `
            <div class="result">
              <a href="${item.FirstURL}" target="_blank">${item.Text}</a>
            </div>`;
        }
      });
    } else {
      html += `<p>No results found. Try another search.</p>`;
    }

    results.innerHTML = html;
  } catch (err) {
    results.innerHTML = `<p>Error fetching results. Try again later.</p>`;
    console.error(err);
  }
}

// Handle Enter key in search box
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    doSearch(searchBox.value);
  }
});

// Handle Go button
goBtn.addEventListener("click", () => {
  doSearch(searchBox.value);
});

// Handle fullscreen button
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      alert(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});
