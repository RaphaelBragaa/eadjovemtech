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
    
    // Implementar funcionalidade de resposta
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reply-btn')) {
            const postId = e.target.getAttribute('data-post-id');
            const replyForm = document.getElementById(`reply-form-${postId}`);
            
            if (replyForm.style.display === 'none' || replyForm.style.display === '') {
                replyForm.style.display = 'block';
            } else {
                replyForm.style.display = 'none';
            }
        }
    });
    
    // Implementar envio de resposta
    document.addEventListener('submit', function(e) {
        if (e.target.classList.contains('reply-form')) {
            e.preventDefault();
            
            const postId = e.target.getAttribute('data-post-id');
            const replyContent = e.target.querySelector('textarea').value;
            
            if (replyContent) {
                const replyContainer = document.getElementById(`replies-${postId}`);
                const newReply = document.createElement('div');
                newReply.className = 'reply-item';
                newReply.innerHTML = `
                    <div class="d-flex mt-2">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" class="reply-avatar" alt="User Avatar">
                        <div class="reply-content">
                            <div class="d-flex justify-content-between">
                                <h6>You</h6>
                                <small class="text-muted">just now</small>
                            </div>
                            <p>${replyContent}</p>
                        </div>
                    </div>
                `;
                
                replyContainer.appendChild(newReply);
                e.target.querySelector('textarea').value = '';
                e.target.style.display = 'none';
                
                // Atualizar contador de respostas
                const responseCounter = document.querySelector(`[data-post-id="${postId}"]`).closest('.post-card').querySelector('.post-stats span:first-child');
                const currentCount = parseInt(responseCounter.textContent.match(/\d+/)[0]);
                responseCounter.innerHTML = `<i class="far fa-comment"></i> ${currentCount + 1} responses`;
            }
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
            
            // Mudar para a aba "Categories"
            const categoriesTabEl = document.querySelector('a[href="#categories"]');
            const tab = new bootstrap.Tab(categoriesTabEl);
            tab.show();
        });
    });
    
    // Adicionar funcionalidade de ordenação para Top Contributors
    document.addEventListener('click', function(e) {
        if (e.target.closest('.sidebar-title') && e.target.closest('.sidebar-title').textContent.includes('Top Contributors')) {
            const contributorsList = document.querySelector('.sidebar-card:first-of-type');
            const contributors = Array.from(contributorsList.querySelectorAll('.contributor-item'));
            
            // Alternar entre ordenação ascendente e descendente
            const isAscending = contributorsList.getAttribute('data-order') === 'asc';
            
            contributors.sort((a, b) => {
                const pointsA = parseInt(a.querySelector('span:last-child').textContent);
                const pointsB = parseInt(b.querySelector('span:last-child').textContent);
                
                return isAscending ? pointsA - pointsB : pointsB - pointsA;
            });
            
            // Limpar e readicionar itens ordenados
            contributors.forEach(item => item.remove());
            contributors.forEach(item => contributorsList.appendChild(item));
            
            // Atualizar atributo de ordenação
            contributorsList.setAttribute('data-order', isAscending ? 'desc' : 'asc');
        }
    });
    
    // Adicionar funcionalidade de ordenação para Upcoming Events
    document.addEventListener('click', function(e) {
        if (e.target.closest('.sidebar-title') && e.target.closest('.sidebar-title').textContent.includes('Upcoming Events')) {
            const eventsList = document.querySelector('.sidebar-card:last-of-type');
            const events = Array.from(eventsList.querySelectorAll('.event-item'));
            
            // Alternar entre ordenação por data e por nome
            const isByDate = eventsList.getAttribute('data-order') === 'date';
            
            events.sort((a, b) => {
                if (isByDate) {
                    // Ordenar por nome do evento
                    const nameA = a.querySelector('h6').textContent;
                    const nameB = b.querySelector('h6').textContent;
                    return nameA.localeCompare(nameB);
                } else {
                    // Ordenar por data
                    const dateA = a.querySelector('.event-day').textContent;
                    const dateB = b.querySelector('.event-day').textContent;
                    return parseInt(dateA) - parseInt(dateB);
                }
            });
            
            // Limpar e readicionar itens ordenados
            events.forEach(item => item.remove());
            events.forEach(item => eventsList.appendChild(item));
            
            // Atualizar atributo de ordenação
            eventsList.setAttribute('data-order', isByDate ? 'name' : 'date');
        }
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
