const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function toggleSidebar() {
  sidebar.classList.toggle('active');
  sidebarOverlay.classList.toggle('active');
}

sidebarToggle.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', toggleSidebar);

// Fechar sidebar ao clicar em um item do menu (mobile)
document.querySelectorAll('.sidebar .nav-link').forEach(link => {
  link.addEventListener('click', function() {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  });
});

// Mapeamento dos vídeos para cada item
const videoMap = {
  'Criar Funções com JavaScript': 'https://www.youtube.com/embed/YgHQRdGZw3w',
  'Apresentando o VisualG': 'https://www.youtube.com/embed/sSY9cnurH1s',
  'Introdução ao Banco de Dados': 'https://www.youtube.com/embed/Ofktsne-utM'
};

// Função para abrir o vídeo em tela cheia ao clicar no botão "Assistir" ou na thumbnail
document.querySelectorAll('.list-group-item button, .video-thumbnail').forEach(element => {
  element.addEventListener('click', function() {
    const videoTitle = this.closest('.list-group-item').querySelector('h6').textContent;
    const videoUrl = videoMap[videoTitle];
    
    if (videoUrl) {
      window.open(videoUrl.replace('embed/', 'watch?v='), '_blank');
    }
  });
});