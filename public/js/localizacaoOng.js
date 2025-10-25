// Botao de editar  
  
const editBtn = document.getElementById("editBtn");
const overlay = document.getElementById("overlay");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const editForm = document.getElementById("editForm");

// Referências aos elementos exibidos
const nome = document.getElementById("ong-nome");
const horario = document.getElementById("ong-horario");
const endereco = document.getElementById("ong-endereco");
const telefone = document.getElementById("ong-telefone");
const email = document.getElementById("ong-email");

// Abrir modal e preencher com dados atuais
editBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
  const [rua, resto] = endereco.textContent.split(",");
  const [num, bairroCidadeEstado] = resto?.trim().split(" - ") || [];

  document.getElementById("edit-nome").value = nome.textContent;
  document.getElementById("edit-horario").value = horario.textContent;
  document.getElementById("edit-rua").value = rua?.replace("R. ", "") || "";
  document.getElementById("edit-numero").value = num?.trim() || "";
  document.getElementById("edit-bairro").value = bairroCidadeEstado?.split(",")[0] || "";
  document.getElementById("edit-cidade").value = "São Paulo";
  document.getElementById("edit-estado").value = "SP";
  document.getElementById("edit-telefone").value = telefone.textContent;
  document.getElementById("edit-email").value = email.textContent;
});

// Fechar modal
[closeModal, cancelBtn].forEach(btn =>
  btn.addEventListener("click", () => overlay.style.display = "none")
);
