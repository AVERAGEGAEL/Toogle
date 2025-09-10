const addressBar = document.getElementById('address-bar');
const goBtn = document.getElementById('go-btn');
const iframe = document.getElementById('browser-iframe');
const fullscreenBtn = document.getElementById('fullscreen-btn');

function loadURL() {
    let input = addressBar.value.trim();
    let url;

    // Detect if input is a URL
    if (input.startsWith('http://') || input.startsWith('https://')) {
        url = input;
    } else {
        // Search Google first
        url = `https://www.google.com/search?q=${encodeURIComponent(input)}`;
    }

    iframe.src = url;

    // Fallback if blocked (iframe can't load)
    iframe.onerror = () => {
        url = `https://www.startpage.com/sp/search?q=${encodeURIComponent(input)}`;
        iframe.src = url;
    }
}

goBtn.addEventListener('click', loadURL);
addressBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') loadURL();
});

fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});
