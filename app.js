document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.querySelector('#ar-viewer');
    const buttons = document.querySelectorAll('.model-btn');
    
    // Elementos de UI
    const title = document.getElementById('model-title');
    const desc = document.getElementById('model-desc');
    const poly = document.getElementById('poly-count');
    const vert = document.getElementById('vertex-count');
    const tex = document.getElementById('texture-res');
    const lightSlider = document.getElementById('lighting-slider');
    const lightVal = document.getElementById('light-val');

    // --- CONFIGURAÇÃO DOS MODELOS ---
    // Certifique-se que os arquivos .glb estão na mesma pasta do index.html
    const models = {
        helmet: {
            src: 'DamagedHelmet.glb',
            title: 'PBR Standard: Battle Helmet',
            desc: 'Ativo de referência da indústria para validação de renderização PBR (Physically Based Rendering). Apresenta mapas complexos de Oclusão de Ambiente (AO), Normal Map para simular danos físicos e Emissive Map para luzes próprias.',
            stats: { poly: '12.480 Tris', vert: '6.200 Verts', tex: '2048px (4 Canais)' }
        },
        dish: {
            src: 'IridescentDishWithOlives.glb',
            title: 'Complex Shader: Iridescence',
            desc: 'Demonstração de efeito de "Thin Film" (filme fino) e refração. O shader calcula a interferência de ondas de luz na superfície transparente, exigindo alto processamento da GPU móvel.',
            stats: { poly: '8.200 Tris', vert: '4.150 Verts', tex: 'Procedural / Gradient' }
        }
    };

    // --- INICIALIZAÇÃO ---
    // Carrega o primeiro modelo automaticamente
    loadModel('helmet');

    // --- EVENTOS ---
    
    // 1. Troca de Modelo ao Clicar
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadModel(btn.getAttribute('data-model'));
        });
    });

    // 2. Controle de Luz em Tempo Real (O "Pulo do Gato")
    if(lightSlider) {
        lightSlider.addEventListener('input', (e) => {
            const theta = e.target.value;
            lightVal.textContent = `${theta}deg`;
            // Gira o mapa de ambiente HDR
            viewer.environmentImage = 'neutral'; 
            viewer.setAttribute('environment-rotation', `0deg ${theta}deg 0deg`);
        });
    }
    
    // --- FUNÇÕES AUXILIARES ---
    function loadModel(key) {
        const data = models[key];
        if(viewer && data) {
            viewer.src = data.src;
            viewer.iosSrc = data.src; // iOS moderno aceita GLB
            
            // Efeito de carregamento nos textos
            title.style.opacity = 0.5;
            setTimeout(() => {
                title.textContent = data.title;
                desc.textContent = data.desc;
                poly.textContent = data.stats.poly;
                vert.textContent = data.stats.vert;
                tex.textContent = data.stats.tex;
                title.style.opacity = 1;
            }, 300);
        }
    }

    // Log para Debug de AR
    viewer.addEventListener('ar-status', (e) => {
        console.log('AR Status:', e.detail.status);
    });
    
    // Tratamento de Erro
    viewer.addEventListener('error', (e) => {
        console.error('Erro ao carregar:', e);
        title.textContent = "Erro de Carregamento";
        desc.textContent = "Verifique se os arquivos .glb estão na pasta correta no GitHub Pages.";
    });
});
