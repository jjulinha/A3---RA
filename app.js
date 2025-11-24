document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.querySelector('#ar-viewer');
    const buttons = document.querySelectorAll('.model-btn');
    const description = document.getElementById('model-desc');

    // Model Data
    const models = {
        robot: {
            src: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
            iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',
            animation: 'Wave',
            desc: 'Robô Expressivo: Um exemplo de robótica avançada com animações fluidas e texturas PBR detalhadas. Ideal para demonstrar articulações complexas.'
        },
        astronaut: {
            src: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
            iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
            animation: 'Wave', // Astronaut might not have Wave, but autoplay will just play default if invalid
            desc: 'Astronauta: Modelo de alta fidelidade de um traje espacial. Demonstra texturas de tecido, reflexos no visor e geometria detalhada.'
        }
    };

    // Handle Model Switching
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update UI
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Get selected model data
            const modelKey = btn.getAttribute('data-model');
            const data = models[modelKey];

            // Update Viewer
            // We use a small timeout to ensure smooth transition if needed, 
            // but model-viewer handles src changes well.
            viewer.src = data.src;
            viewer.iosSrc = data.iosSrc;
            viewer.animationName = data.animation || null;

            // Update Description with fade effect
            description.style.opacity = '0';
            setTimeout(() => {
                description.textContent = data.desc;
                description.style.opacity = '1';
            }, 300);
        });
    });

    // Optional: Log AR status for debugging
    viewer.addEventListener('ar-status', (event) => {
        console.log('AR Status:', event.detail.status);
    });

    // Texture override removed to restore original model colors and details
    // viewer.addEventListener('load', async () => { ... });
});
