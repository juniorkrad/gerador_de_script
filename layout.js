// Espera o documento HTML ser completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

    // 1. Encontra os locais no HTML onde o cabeçalho e rodapé serão inseridos
    const headerElement = document.getElementById('main-header');
    const footerElement = document.getElementById('main-footer');

    // --- LÓGICA DO BOTÃO HOME ---
    // Pega o nome do arquivo da página atual
    const currentPage = window.location.pathname.split("/").pop();
    
    let homeButtonHtml = ''; // Começa como uma string vazia

    // Se a página atual NÃO for a 'index.html' (ou a raiz), cria o botão
    if (currentPage !== 'index.html' && currentPage !== '') {
        homeButtonHtml = `
            <a href="index.html">
                <button type="button" class="secondary" id="home-button">
                    Voltar à Home
                </button>
            </a>
        `;
    }
    // --- FIM DA LÓGICA DO BOTÃO HOME ---


    // 2. Define o conteúdo HTML para o cabeçalho
    const headerContent = `
        <div class="header-container">
            <img src="banner.png" alt="Banner Gerador de Script" id="header-banner">
            <h1>Gerador de Script</h1>
            
            <div class="header-nav">
                ${homeButtonHtml}
            </div>
        </div>
    `;

    // 3. Define o conteúdo HTML para o rodapé
    const footerContent = `
        <p>&copy; 2025 Gerador de Script | Desenvolvido por 👤@juniorkrad + 🤖Gemini</p>
    `;

    // 4. Insere o conteúdo nos elementos (apenas se eles existirem na página)
    if (headerElement) {
        headerElement.innerHTML = headerContent;
    }

    if (footerElement) {
        footerElement.innerHTML = footerContent;
    }

    
    // --- 5. LÓGICA DE TRANSIÇÃO DE PÁGINA (NOVO) ---
    
    // Pega o tempo da variável CSS (400ms)
    // (Multiplicamos por 1000 para converter de segundos '0.4s' para milissegundos)
    const transitionTime = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--page-transition-time')) * 1000;

    // Encontra todos os links da página
    const allLinks = document.querySelectorAll('a');

    allLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');

            // Verifica se é um link interno (não é link externo, não é âncora, etc.)
            // E não é um link para abrir em nova aba (target="_blank")
            if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto') && this.target !== '_blank') {
                
                // 1. Previne a navegação imediata
                event.preventDefault(); 

                // 2. Adiciona a classe para o fade-out
                document.body.classList.add('fade-out');

                // 3. Espera a animação (os 400ms) e então navega
                setTimeout(() => {
                    window.location.href = href;
                }, transitionTime); 
            }
        });
    });

});