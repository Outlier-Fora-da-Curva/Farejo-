function criarPedidoCadastroOng() {
    return `
        <div class="card aprovacoes">
            <div class="aprovacao"> 
                <div class="perfil"> <img src="/imgs/userOng1.png" alt="Foto">
                    <div class="dados">
                        <h2 class="nome-ong"></h2>
                        <p><b>Email:</b><span class="email-ong"></span></p>
                        <p><b>CNPJ:</b><span class="cnpj-ong"></span></p>
                        <p><b>CPF responsável:</b><span class="cpf-ong"></span></p>
                        <p><b>CEP:</b><span class="cep-ong"></span></p>
                        <p><b>Cidade:</b><span class="cidade-ong"></span></p>
                    </div>
                </div>
                <div class="acoes-aprovacao">
                    <button title="Deletar" class="btn-delete">
                        <img src="/imgs/delete.png" alt="Deletar">
                    </button>
                    <button title="Aprovar" class="btn-approve">
                        <img src="/imgs/check.png" alt="Aprovar">
                    </button>
                </div>
            </div>

        </div>


    `;
}

async function aprovarOng(id) {
    try {
        const resposta = await fetch(`/aprovacao/aprovar/${id}`, {
            method: 'POST'
        });
        const dados = await resposta.json();
        if (dados.message === 1) {
            alert('ONG aprovada com sucesso!');
        } else {
            alert('Erro ao aprovar ONG.');
        }
        location.reload();
    } catch (erro) {
        console.error('Erro ao aprovar ONG:', erro);
    }
}

async function deletarOng(id, event) {
    if (!confirm('Tem certeza que deseja excluir esta ONG?')) return;
    try {
        const resposta = await fetch(`/aprovacao/deletar/${id}`, {
            method: 'DELETE'
        });
        const dados = await resposta.json();
        if (resposta.ok) {
            alert(dados.message || 'ONG excluída com sucesso!');

            // 🔥 Remove o card visualmente
            const card = event.target.closest('.card.aprovacoes');
            if (card) card.remove();
        } else {
            console.error('Erro ao excluir ONG:', dados.error);
        }
    } catch (erro) {
        console.error('Erro ao deletar ONG:', erro);
    }
}




async function carregarPedidoCadastroOng() {
    try {
        const resposta = await fetch('/aprovacao');
        const dados = await resposta.json();

        const containerAprovacao = document.getElementById('aprovação');
        if (!containerAprovacao) {
            console.error('Elemento aprovação não encontrado');
            return;
        }
        containerAprovacao.innerHTML = '<h1 class="tituloDash">Solicitação das ONGs</h1>';

        dados.ongs.forEach(ong => {
            containerAprovacao.insertAdjacentHTML('beforeend', criarPedidoCadastroOng());

            const ultimoCard = containerAprovacao.lastElementChild;
            ultimoCard.querySelector('.nome-ong').textContent = ' ' + ong.nomeOng;
            ultimoCard.querySelector('.email-ong').textContent = ' ' + ong.email;
            ultimoCard.querySelector('.cnpj-ong').textContent = ' ' + ong.CNPJ;
            ultimoCard.querySelector('.cpf-ong').textContent = ' ' + ong.cpfResponsavel;
            ultimoCard.querySelector('.cep-ong').textContent = ' ' + ong.CEP;
            ultimoCard.querySelector('.cidade-ong').textContent = ' ' + `${ong.cidade}/${ong.UF}`;

            const btnAprovar = ultimoCard.querySelector('.btn-approve');
            const btnDeletar = ultimoCard.querySelector('.btn-delete');

            btnAprovar.addEventListener('click', () => aprovarOng(ong.idOng));
            btnDeletar.addEventListener('click', (event) => deletarOng(ong.idOng, event));
        });

    } catch (erro) {
        console.error('Erro ao carregar pedidos:', erro);
    }
}

document.addEventListener('DOMContentLoaded', carregarPedidoCadastroOng);