document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.querySelector('#ar-viewer');
    const buttons = document.querySelectorAll('.model-btn');
    const description = document.getElementById('model-desc');
    
    // Elementos de Estatísticas
    const statPoly = document.getElementById('poly-count');
    const statVertex = document.getElementById('vertex-count');
    const statSize = document.getElementById('file-size');

    // Model Data com informações Técnicas
    const models = {
        robot: {
            src: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
            iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',
            animation: 'Wave',
            desc: 'Robô Expressivo: Análise de malha deformável (Skinned Mesh). Demonstração de rigging hierárquico e interpolação de animação.',
            stats: {
                poly: '~24.500',
                vert: '~12.200',
                size: '5.4 MB'
            }
        },
        astronaut: {
            src: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
            iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
            animation: 'Wave', 
            desc: 'Astronauta: Estudo de materiais reflexivos e oclusão de ambiente. Demonstra mapeamento UV complexo em superfícies curvas.',
            stats: {
                poly: '~18.200',
                vert: '~9.100',
                size: '3.8 MB'
            }
        }
    };

    // Handle Model Switching
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI Updates
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const modelKey = btn.getAttribute('data-model');
            const data = models[modelKey];

            // Viewer Updates
            viewer.src = data.src;
            viewer.iosSrc = data.iosSrc;
            viewer.animationName = data.animation || null;

            // Info Updates
            description.style.opacity = '0';
            
            // Simular processamento de dados
            setTimeout(() => {
                description.textContent = data.desc;
                statPoly.textContent = data.stats.poly;
                statVertex.textContent = data.stats.vert;
                statSize.textContent = data.stats.size;
                description.style.opacity = '1';
            }, 200);
        });
    });

    // Log AR events for Debugging
    viewer.addEventListener('ar-status', (event) => {
        console.log('Estado do Sistema AR:', event.detail.status);
        if(event.detail.status === 'session-started'){
            description.textContent = "Sessão AR Iniciada: Detectando planos horizontais (Floor Tracking)...";
        }
    });
});

    // Otimização: Pausar animação se perder o tracking AR para economizar bateria/processamento
    viewer.addEventListener('ar-status', (event) => {
        if(event.detail.status === 'session-started'){
            description.textContent = "Modo AR Ativo: Aponte para o chão e mova o celular lentamente lateralmente.";
           
            // viewer.pause(); 
        } else if(event.detail.status === 'not-presenting'){
            description.textContent = data.desc; // Restaura descrição original
        }
    });

// ... (resto do código)
