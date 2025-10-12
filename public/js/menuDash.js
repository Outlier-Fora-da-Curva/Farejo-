// Selecionar elementos principais
const menuItems = document.querySelectorAll('.linksOng');
const logo = document.querySelector('.logo');
const btnAbrir = document.querySelector('#btn-abrir');
const menuSide = document.querySelector('.navbarOng');

// Função para destacar o item ativo
function selectLink() {
  menuItems.forEach(item => item.removeAttribute('id'));
  this.setAttribute('id', 'ativo');
}


menuItems.forEach(item => {
  item.addEventListener('click', selectLink);
});

// Função para abrir/fechar o menu lateral
if (btnAbrir) {
  btnAbrir.addEventListener('click', (event) => {
    event.stopPropagation(); 
    menuSide.classList.toggle('recolhido');

    // Troca a logo 
    if (menuSide.classList.contains('recolhido')) {
      logo.src = "/imgs/logoFocinho.png"; // menu fechado
    } else {
      logo.src = "/imgs/logoCompleta.png"; // menu aberto
    }
  });
}


menuItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    const link = item.querySelector("a");
    const href = link?.getAttribute("href");

    // Impede clique no botão de abrir/fechar de interferir
    if (event.target.closest('#btn-abrir')) return;

    // Se o menu estiver recolhido, abre primeiro
    if (menuSide.classList.contains('recolhido')) {
      menuSide.classList.remove('recolhido');
      logo.src = "/imgs/logoCompleta.png";

    } else if (href) {
      window.location.href = href;
    }
  });
});
