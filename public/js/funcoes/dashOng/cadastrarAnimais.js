
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formCadastro');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);

    try {
      const res = await fetch('/cadastrarAnimaisOng', {
        method: 'POST',
        body: fd
      });
      if (res.ok) {
        // fechar modal e atualizar lista
        closeModal('modalAnimal1');
        location.reload(); // ou atualizar dinamicamente
      } else {
        console.error('Erro no envio', await res.text());
      }
    } catch (err) {
      console.error('Erro fetch:', err);
    }
  });
});