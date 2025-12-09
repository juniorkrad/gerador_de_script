// Espera o documento HTML ser completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

    // 1. Encontra os locais no HTML onde o cabeçalho e rodapé serão inseridos
    const headerElement = document.getElementById('main-header');
    const footerElement = document.getElementById('main-footer');

    // --- FUNÇÃO AUXILIAR: NAVEGAÇÃO SUAVE ---
    // Pega o tempo da variável CSS (0.4s) e converte para milissegundos
    const transitionTime = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--page-transition-time')) * 1000;

    function smoothNavigation(url) {
        // Adiciona a classe que faz a tela sumir (fade-out)
        document.body.classList.add('fade-out');

        // Espera o tempo da animação e muda de página
        setTimeout(() => {
            window.location.href = url;
        }, transitionTime);
    }


    // --- 2. GERAÇÃO DO CABEÇALHO ---
    
    // Pega o nome do arquivo da página atual
    const currentPage = window.location.pathname.split("/").pop();
    let homeButtonHtml = ''; 

    // Se NÃO for a home, cria o botão
    // NOTA: Usamos apenas <button> aqui para manter o estilo 'secondary' do CSS
    // O redirecionamento será feito pelo evento 'onclick' adicionado depois
    if (currentPage !== 'index.html' && currentPage !== '') {
        homeButtonHtml = `
            <button type="button" class="secondary" id="home-button">
                Voltar à Home
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

    // Insere o cabeçalho
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

            // Verifica se é um link interno válido
            if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto') && this.target !== '_blank') {
                event.preventDefault(); // Impede a troca brusca de página
                smoothNavigation(href); // Chama nossa função de transição
            }
        });
    });

});