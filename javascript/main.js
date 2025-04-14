document.addEventListener('DOMContentLoaded', function() {
    // Dados de usuários "fake" para simulação
    const usuariosFake = [
        { email: 'aluno@exemplo.com', senha: 'aluno123', nome: 'Aluno Exemplo' }
    ];

    // Seleciona o formulário de login
    const loginForm = document.querySelector('.loginform');

    // Adiciona o evento de submit ao formulário
    loginForm.addEventListener('submit', function(event) {
        // Previne o comportamento padrão do formulário (recarregar a página)
        event.preventDefault();
        
        // Obtém os valores dos campos
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        
        // Verifica se os campos estão preenchidos
        if (!email || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Tenta encontrar o usuário na lista de usuários fake
        const usuarioEncontrado = usuariosFake.find(
            usuario => usuario.email === email && usuario.senha === senha
        );
        
        if (usuarioEncontrado) {
            // Login bem-sucedido
            alert(`Login realizado com sucesso! Bem-vindo, ${usuarioEncontrado.nome}!`, 'sucesso');
            
            // Simula armazenamento de sessão
            localStorage.setItem('usuarioLogado', JSON.stringify({
                email: usuarioEncontrado.email,
                nome: usuarioEncontrado.nome,
                horarioLogin: new Date().toISOString()
            }));
            
            // Redireciona após 2 segundos (simulação)
            setTimeout(function() {
                // Redireciona para uma página de dashboard ou home
                 window.location.href = './pages/dashboard.html';
                
                // Como é um login fake, apenas exibe uma mensagem
                console.log('Redirecionando para dashboard...');
                alert('Redirecionando para o Dashboard...');
            }, 2000);
        } else {
            // Login falhou
            alert('Email ou senha incorretos. Tente novamente.');
            
            // Limpa o campo de senha
            document.getElementById('senha').value = '';
        }

        
    });
    
});
