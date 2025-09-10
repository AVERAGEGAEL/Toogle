const addressBar = document.getElementById('address-bar');
const goBtn = document.getElementById('go-btn');
const iframe = document.getElementById('browser-iframe');
const homepage = document.getElementById('homepage');
const fullscreenBtn = document.getElementById('fullscreen-btn');

function loadURL() {
    let input = addressBar.value.trim();

    if (!input) return;

    // Determine if input is a full URL
    let url;
    if (input.startsWith('http://') || input.startsWith('https://')) {
        url = input;
    } else {
        // Default search using DuckDuckGo
        url = `https://duckduckgo.com/?q=${encodeURIComponent(input)}`;
    }

    homepage.style.display = 'none';
    iframe.style.display = 'block';
    iframe.src = url;
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
