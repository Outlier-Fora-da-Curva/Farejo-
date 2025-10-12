const abrirModal = document.getElementById("abrirModal");
const fecharModal = document.getElementById("fecharModal");
const modal = document.getElementById("modalCadastro");
const formPublicidade = document.getElementById("formPublicidade");
const tabelaPublicidades = document.getElementById("tabelaPublicidades").querySelector("tbody");

// Abrir modal
abrirModal.addEventListener("click", () => {
    modal.style.display = "flex";
});

// Fechar modal
fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Salvar publicidade
formPublicidade.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const status = document.getElementById("status").value;
    const imagemInput = document.getElementById("imagem");
    let imagemURL = "";

    if (imagemInput.files && imagemInput.files[0]) {
        imagemURL = URL.createObjectURL(imagemInput.files[0]);
    }

    // Cria linha na tabela
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${imagemURL ? `<img src="${imagemURL}" class="banner-preview">` : "Sem imagem"}</td>
        <td>${titulo}</td>
        <td><span class="${status === "Ativo" ? "status-ativo" : "status-expirado"}">${status}</span></td>
        <td>
            <button class="btn-acao btn-editar" onclick="openModal()">Editar</button>
            <button class="btn-acao btn-excluir">Excluir</button>
        </td>
      `;

    // Adiciona linha na tabela
    tabelaPublicidades.appendChild(tr);

    // Limpa form e fecha modal
    formPublicidade.reset();
    modal.style.display = "none";
});

// Delegação de eventos para excluir
tabelaPublicidades.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-excluir")) {
        const linha = e.target.closest("tr");
        linha.remove();
    }
});






// EDITAR PUBLICIDADE

const modalBg = document.getElementById('modal-bg');

    function openModal() {
      modalBg.style.display = 'flex';
    }

    function closeModal() {
      modalBg.style.display = 'none';
    }