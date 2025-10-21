function criarPerfilUser() {
    return `
        <div class="cardVagas">
            <div class="ladoA">
                <h2 class="subtituloDash nome-user"><b></b></h2>
                <h3><b>Email: </b> <span class="email-user"></span></h3>
                <h3><b>Local: </b> <span class="local-user"></span></h3>
                <h3><b>Descrição: </b> <span class="descricao-user"></span></h3>
            </div>
            <div class="ladoB">
                <div class="cardStatus">Ativo</div>
                <div class="inscricao">
                    <h2 class="subtituloDash"><b>3</b></h2>
                    <h3><b>Adoções</b></h3>
                </div>
            </div>
        </div>
    `;
}

async function carregarPerfisUsuario() {
    try {
        const resposta = await fetch('/perfisUsuario');
        const dados = await resposta.json();

        const containerPerfis = document.getElementById('perfilUsuario');
        if (!containerPerfis) {
            console.error('Elemento perfilUsuario não encontrado');
            return;
        }

        // Limpa o conteúdo anterior
        containerPerfis.innerHTML = '<h1 class="tituloDash">Perfis dos Usuários</h1>';

        // Adiciona os perfis
        dados.users.forEach(user => {
            containerPerfis.insertAdjacentHTML('beforeend', criarPerfilUser());

            const ultimoCard = containerPerfis.lastElementChild;
            
            ultimoCard.querySelector('.nome-user').textContent = user.nome;
            ultimoCard.querySelector('.email-user').textContent = user.email;
            ultimoCard.querySelector('.local-user').textContent = `${user.cidade}/${user.uf}`;
        });

    } catch (erro) {
        console.error('Erro ao carregar perfis:', erro);
    }
}

document.addEventListener('DOMContentLoaded', carregarPerfisUsuario);