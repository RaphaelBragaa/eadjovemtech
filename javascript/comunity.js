document.addEventListener('DOMContentLoaded', function() {
    // Referências aos elementos DOM
    const newPostBtn = document.getElementById('newPostBtn');
    const submitPostBtn = document.getElementById('submitPostBtn');
    const postForm = document.getElementById('newPostForm');
    const highlightsTab = document.getElementById('highlights');
    const recentTab = document.getElementById('recent');
    const unansweredTab = document.getElementById('unanswered');
    
    // Inicializar o modal
    const newPostModal = new bootstrap.Modal(document.getElementById('newPostModal'));
    
    // Abrir modal de nova postagem
    newPostBtn.addEventListener('click', function() {
        newPostModal.show();
    });
    
    // Enviar nova postagem
    submitPostBtn.addEventListener('click', function() {
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;
        const tagsInput = document.getElementById('postTags').value;
        
        if (title && content) {
            // Criar tags HTML
            const tagsArray = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
            const tagsHtml = tagsArray.map(tag => `<span class="tag">${tag}</span>`).join('');
            
            // Criar nova postagem
            const newPost = document.createElement('div');
            newPost.className = 'post-card';
            newPost.innerHTML = `
                <div class="d-flex">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" class="post-avatar" alt="User Avatar">
                    <div class="post-content">
                        <h5 class="post-title">${title}</h5>
                        <div class="post-tags">
                            ${tagsHtml}
                        </div>
                        <div class="post-stats">
                            <span><i class="far fa-comment"></i> 0 responses</span>
                            <span><i class="far fa-clock"></i> just now</span>
                        </div>
                    </div>
                </div>
            `;
            
            // Adicionar a nova postagem à aba "Recent"
            recentTab.insertBefore(newPost, recentTab.firstChild);
            
            // Limpar formulário e fechar modal
            postForm.reset();
            newPostModal.hide();
            
            // Mudar para a aba "Recent"
            const recentTabEl = document.querySelector('a[href="#recent"]');
            const tab = new bootstrap.Tab(recentTabEl);
            tab.show();
        }
    });
    
    
    // Funcionalidade de filtro para categorias
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('h5').textContent.trim();
            
            // Filtrar posts por categoria
            const posts = document.querySelectorAll('.post-card');
            posts.forEach(post => {
                const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                if (tags.some(tag => category.toLowerCase().includes(tag))) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
            
            // Mudar para a aba "Categorias"
            const categoriesTabEl = document.querySelector('a[href="#categories"]');
            const tab = new bootstrap.Tab(categoriesTabEl);
            tab.show();
        });
    });
    
    // Implementar funcionalidade de pesquisa
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'form-control mb-3';
    searchInput.placeholder = 'Pesquisar discussões...';
    searchInput.id = 'searchDiscussionInput';
    
    // Inserir campo de pesquisa antes das abas
    const tabsContainer = document.getElementById('discussionTabs');
    tabsContainer.parentNode.insertBefore(searchInput, tabsContainer);
    
    // Funcionalidade de pesquisa em tempo real
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const posts = document.querySelectorAll('.post-card');
        
        posts.forEach(post => {
            const title = post.querySelector('.post-title').textContent.toLowerCase();
            const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            
            if (title.includes(searchTerm) || tags.some(tag => tag.includes(searchTerm))) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });
});
