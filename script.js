const addressBar = document.getElementById('address-bar');
const goBtn = document.getElementById('go-btn');
const iframe = document.getElementById('browser-iframe');
const homepage = document.getElementById('homepage');
const fullscreenBtn = document.getElementById('fullscreen-btn');

const UV_BACKEND = 'https://uv.uraverageopdoge.workers.dev/fetch?url=';

function loadURL() {
    let input = addressBar.value.trim();
    if (!input) return;

    let url;
    if (input.startsWith('http://') || input.startsWith('https://')) {
        url = input;
    } else {
        // If it’s a search term, send to Google search URL
        url = `https://www.google.com/search?q=${encodeURIComponent(input)}`;
    }

    // Encode URL for UV backend
    const uvURL = UV_BACKEND + encodeURIComponent(url);

    homepage.style.display = 'none';
    iframe.style.display = 'block';
    iframe.src = uvURL;
}

// Button click
goBtn.addEventListener('click', loadURL);

// Enter key
addressBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') loadURL();
});

// Fullscreen
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});
