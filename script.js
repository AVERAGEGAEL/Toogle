// Elements
const searchBox = document.getElementById("search-box");
const goBtn = document.getElementById("go-btn");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const homepage = document.getElementById("homepage");
const results = document.getElementById("results");

// Create viewer container + iframe (hidden by default)
const viewerContainer = document.createElement("div");
viewerContainer.id = "viewer-container";
viewerContainer.style.display = "none";
viewerContainer.style.flex = "1";
viewerContainer.style.borderTop = "1px solid #dadce0";

const viewer = document.createElement("iframe");
viewer.id = "viewer";
viewer.style.width = "100%";
viewer.style.height = "100%";
viewer.style.border = "none";

viewerContainer.appendChild(viewer);
document.body.insertBefore(viewerContainer, document.querySelector("footer"));

// Search function
async function doSearch(query) {
  if (!query.trim()) return;

  // Hide homepage, show results
  homepage.style.display = "none";
  viewerContainer.style.display = "none";
  results.style.display = "block";
  results.innerHTML = "<p>Searching...</p>";

  try {
    // DuckDuckGo Instant Answer API
    const res = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
    const data = await res.json();

    // Build results
    let html = `<h2>Results for "${query}"</h2>`;
    if (data.RelatedTopics && data.RelatedTopics.length > 0) {
      data.RelatedTopics.forEach(item => {
        if (item.Text && item.FirstURL) {
          html += `
            <div class="result">
              <a href="#" data-url="${item.FirstURL}">${item.Text}</a>
            </div>`;
        }
      });
    } else {
      html += `<p>No results found. Try another search.</p>`;
    }

    results.innerHTML = html;

    // Handle clicks on results
    document.querySelectorAll(".result a").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        openInViewer(link.getAttribute("data-url"));
      });
    });

  } catch (err) {
    results.innerHTML = `<p>Error fetching results. Try again later.</p>`;
    console.error(err);
  }
}

// Open site inside Toogle viewer
function openInViewer(url) {
  results.style.display = "none";
  viewerContainer.style.display = "flex";
  viewer.src = url;

  // Detect iframe CSP issues
  viewer.onerror = () => {
    viewerContainer.innerHTML = `
      <div style="padding:20px; color:#d93025;">
        <h2>⚠️ Site blocked from embedding</h2>
        <p>This website doesn’t allow being opened inside Toogle.<br>
        Try another site or wait until UV mode is added.</p>
      </div>`;
  };
}

// Handle Enter key
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    doSearch(searchBox.value);
  }
});

// Handle Go button
goBtn.addEventListener("click", () => {
  doSearch(searchBox.value);
});

// Fullscreen toggle
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      alert(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});
