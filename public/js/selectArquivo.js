// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  const fileInputs = document.querySelectorAll('input[type="file"]');
  if (!fileInputs.length) {
    console.warn('selectArquivo: nenhum input[type="file"] encontrado.');
    return;
  }

  fileInputs.forEach(input => {
    input.addEventListener('change', function () {
      const file = this.files && this.files[0];

      // procura a imagem de preview mais próxima (prioridade: mesmo dialog > mesmo .lado-esquerdo > fallback global)
      const preview =
        this.closest('dialog')?.querySelector('.img-preview') ||
        this.closest('.lado-esquerdo')?.querySelector('.img-preview') ||
        document.querySelector('.img-preview');

      if (!preview) {
        console.warn('selectArquivo: preview não encontrado para este input', this);
        return;
      }

      if (file) {
        const url = URL.createObjectURL(file);
        preview.src = url;
        preview.onload = () => URL.revokeObjectURL(url);
      } else {
        preview.src = '/imgs/userPet.png';
      }
    });
  });
});
// ...existing code...