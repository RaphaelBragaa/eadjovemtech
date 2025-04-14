document.addEventListener('DOMContentLoaded', function() {
    // Dados para os cursos em destaque
    const cursosDestaque = [
        {
            titulo: "Introdução ao Desenvolvimento Web",
            instrutor: "João Silva",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRELunlkyFk5TtyF76yEpHkyvGPOfaDGIXK-A&s",
            horas: "45 horas",
            nivel: "Iniciante",
            certificado: "Certificado",
            avaliacao: 4.5,
            numeroAvaliacoes: 12345
        },
        {
            titulo: "Introdução a Banco de Dados",
            instrutor: "Maria Oliveira",
            imagem: "https://horadecodar.com.br/wp-content/uploads/2023/06/banco-de-dados.png",
            horas: "30 horas",
            nivel: "Iniciante",
            certificado: "Certificado",
            avaliacao: 5,
            numeroAvaliacoes: 4751,
        },
        {
            titulo: "Tecnologias em Nuvem",
            instrutor: "José Oliveira",
            imagem: "https://blog.saninternet.com/wp-content/uploads/2021/09/cloud-computing.png",
            horas: "12 horas",
            nivel: "Intermediário",
            certificado: "Certificado",
            avaliacao: 2,
            numeroAvaliacoes: 4751,
        },
        {
            titulo: "Lógica de Programação",
            instrutor: "Flávio Machado",
            imagem: "https://assets-blog.hostgator.com.br/wp-content/uploads/2016/09/logica-de-programacao-blog.webp",
            horas: "16 horas",
            nivel: "Iniciante",
            certificado: "Certificado",
            avaliacao: 5,
            numeroAvaliacoes: 4751,
        },
        {
            titulo: "Introdução ao No-Code",
            instrutor: "Max Valaredo",
            imagem: "https://appmaster.io/images/no-code-preview.png",
            horas: "16 horas",
            nivel: "Iniciante",
            certificado: "Certificado",
            avaliacao: 4,
            numeroAvaliacoes: 4751,
        },
    ];

    const containerDestaque = document.getElementById('featuredCoursesContainer');
    cursosDestaque.forEach(curso => {
        const estrelas = '★'.repeat(Math.floor(curso.avaliacao)) + '☆'.repeat(5 - Math.floor(curso.avaliacao));
        const cartaoCurso = `
            <div class="col-md-4 mb-4">
                <div class="course-card">
                    <div class="course-image-container">
                        <img src="${curso.imagem}" alt="${curso.titulo}" class="course-image">
                    </div>
                    <div class="course-details">
                        <h3 class="course-title">${curso.titulo}</h3>
                        <p class="course-instructor">Por ${curso.instrutor}</p>
                        <div class="course-rating">
                            <div class="stars">${estrelas}</div>
                            <span class="rating-count">(${curso.numeroAvaliacoes.toLocaleString()})</span>
                        </div>
                        <div class="course-meta">
                            <div class="meta-item">
                                <i class="far fa-clock"></i>
                                <span>${curso.horas}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-signal"></i>
                                <span>${curso.nivel}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-certificate"></i>
                                <span>${curso.certificado}</span>
                            </div>
                        </div>
                        <button class="enroll-button">Inscrever-se</button>
                    </div>
                </div>
            </div>
        `;
        containerDestaque.innerHTML += cartaoCurso;
    });

    // Dados para Continue Aprendendo
    const continuarAprendendo = [
        {
            titulo: "Lógica de Programação",
            progresso: 65,
            concluido: "10/16 horas",
            imagem: "https://assets-blog.hostgator.com.br/wp-content/uploads/2016/09/logica-de-programacao-blog.webp"
        },
        {
            titulo: "Introdução ao No-Code",
            progresso: 30,
            concluido: "8/24 horas",
            imagem: "https://appmaster.io/images/no-code-preview.png"
        }
    ];

    const containerContinuar = document.getElementById('continueCoursesContainer');
    continuarAprendendo.forEach(curso => {
        const cartaoContinuar = `
            <div class="col-md-6 mb-4">
                <div class="learning-card">
                    <img src="${curso.imagem}" alt="${curso.titulo}" class="learning-image">
                    <div class="learning-details">
                        <h3 class="learning-title">${curso.titulo}</h3>
                        <div class="progress-container">
                            <div class="progress-bar" style="width: ${curso.progresso}%;"></div>
                        </div>
                        <p class="progress-text">${curso.concluido} concluídas</p>
                        <button class="continue-button">
                            Continuar Aprendendo <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        containerContinuar.innerHTML += cartaoContinuar;
    });

    // Dados para Categorias
    const categorias = [
        { nome: "Programação", contagem: "1.224 cursos", icone: "fas fa-code" },
        { nome: "Negócios", contagem: "845 cursos", icone: "fas fa-chart-line" },
        { nome: "Design", contagem: "643 cursos", icone: "fas fa-paint-brush" },
        { nome: "IA & ML", contagem: "432 cursos", icone: "fas fa-robot" }
    ];

    const containerCategorias = document.querySelector('.browse-categories .row');
    containerCategorias.innerHTML = ''; 
    categorias.forEach(categoria => {
        const cartaoCategoria = `
            <div class="col-md-3 mb-4">
                <div class="category-card">
                    <div class="icon-container">
                        <i class="${categoria.icone}"></i>
                    </div>
                    <h3>${categoria.nome}</h3>
                    <p>${categoria.contagem}</p>
                </div>
            </div>
        `;
        containerCategorias.innerHTML += cartaoCategoria;
    });

    // Funcionalidade de pesquisa
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const termo = searchInput.value.toLowerCase();
        const todosCursos = document.querySelectorAll('.course-card');
        todosCursos.forEach(curso => {
            const titulo = curso.querySelector('.course-title').textContent.toLowerCase();
            if (titulo.includes(termo)) {
                curso.style.display = 'block';
            } else {
                curso.style.display = 'none';
            }
        });
    });


});
