
// Funções de abrir/fechar modal
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.showModal();
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.close();
}

// Preview da imagem
const inputImagem = document.getElementById('inputImagemAnimal1');
const preview = document.getElementById('previewAnimal1');

if (inputImagem) {
  inputImagem.addEventListener('change', () => {
    const file = inputImagem.files[0];
    if (file) {
      preview.src = URL.createObjectURL(file);
    }
  });
}