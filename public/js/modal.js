
// const modal = document.getElementById('modal');
// const form  = document.getElementById('cadastroForm');

// form.addEventListener('submit', confirmacao);

// async function confirmacao(event) {
//   event.preventDefault();

//   const data = Object.fromEntries(new FormData(form).entries());

//   try {
//     const response = await fetch(form.action, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     });

//     const result = await response.json();

//     if (result.success) {
//       modal.showModal();   
//       form.reset();
//     } else {
//       alert('Erro ao cadastrar.');
//     }
//   } catch (err) {
//     alert('Erro de conexão com o servidor.');
//     console.error(err);
//   }
// }

// function fecharModal() {
//   modal.close(); 
// }