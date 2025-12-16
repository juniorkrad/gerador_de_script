// Espera o documento HTML ser completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

    // 1. Encontra os locais no HTML onde o cabeçalho e rodapé serão inseridos
    const headerElement = document.getElementById('main-header');
    const footerElement = document.getElementById('main-footer');

    // --- FUNÇÃO AUXILIAR: NAVEGAÇÃO SUAVE ---
    const transitionTime = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--page-transition-time')) * 1000;

    function smoothNavigation(url) {
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = url;
        }, transitionTime);
    }


    // --- 2. GERAÇÃO DO CABEÇALHO E TÍTULO ---
    
    // Pega o nome do arquivo da página atual
    const currentPage = window.location.pathname.split("/").pop();
    
    // *** NOVA LÓGICA: DEFINIR TÍTULOS LIMPOS ***
    const pageTitles = {
        'index.html': 'Gerador de Script',
        '': 'Gerador de Script', // Caso acesse a raiz sem nome de arquivo
        'vlan-porta.html': 'Vlan da Porta',
        'vlan-100.html': 'Vlan 100'
    };

    // Se a página atual estiver na lista, atualiza o título da aba
    if (pageTitles[currentPage]) {
        document.title = pageTitles[currentPage];
    }
    // *******************************************

    let homeButtonHtml = ''; 

    // Se NÃO for a home, cria o botão
    if (currentPage !== 'index.html' && currentPage !== '') {
        homeButtonHtml = `
            <button type="button" class="secondary" id="home-button">
                Home
            </button>
        `;
    }

    const headerContent = `
        <div class="header-container">
            <img src="banner.png" alt="Banner Gerador de Script" id="header-banner">
            <h1>Gerador de Script</h1>
            
            <div class="header-nav">
                ${homeButtonHtml}
            </div>
        </div>
    `;

    if (headerElement) {
        headerElement.innerHTML = headerContent;
    }


    // --- 3. GERAÇÃO DO RODAPÉ ---
    const footerContent = `
        <p>&copy; 2025 Gerador de Script | Desenvolvido por 👤@juniorkrad + 🤖Gemini</p>
    `;

    if (footerElement) {
        footerElement.innerHTML = footerContent;
    }


    // --- 4. APLICAÇÃO DOS EVENTOS DE CLIQUE (TRANSIÇÃO) ---

    // A) Para o Botão Home (se ele existir)
    const homeBtnElement = document.getElementById('home-button');
    if (homeBtnElement) {
        homeBtnElement.addEventListener('click', function() {
            smoothNavigation('index.html');
        });
    }

    // B) Para todos os links normais da página (<a>)
    const allLinks = document.querySelectorAll('a');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');

            if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto') && this.target !== '_blank') {
                event.preventDefault(); 
                smoothNavigation(href); 
            }
        });
    });

});