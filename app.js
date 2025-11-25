document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.querySelector('#ar-viewer');

    // Optional: Log AR status for debugging
    viewer.addEventListener('ar-status', (event) => {
        console.log('AR Status:', event.detail.status);
    });

    console.log("AR Hardware Viewer Initialized");
});
