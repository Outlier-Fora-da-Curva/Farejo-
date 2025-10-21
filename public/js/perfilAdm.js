var menuItem = document.querySelectorAll('.linksOng');
var logo = document.querySelector('.logo'); 

function selectLink() {
    // Remove o "ativo" de tudo
    menuItem.forEach((item) =>
        item.removeAttribute('id')
    );

    // Deixa "ativo" o item clicado
    this.setAttribute('id', 'ativo');
}

menuItem.forEach((item) =>
    item.addEventListener('click', selectLink)
);

// Botão de abrir/recolher menu
var btnAbrir = document.querySelector('#btn-abrir');
var menuSide = document.querySelector('.navbarOng');

if (btnAbrir) {
    btnAbrir.addEventListener('click', function () {
        menuSide.classList.toggle('recolhido');

        if (menuSide.classList.contains('recolhido')) {
            logo.src = "/imgs/perfilAdm/logoFocinho.png";
        } else {
            logo.src = "/imgs/perfilAdm/logoFarejo.png";
        }
    });
}

