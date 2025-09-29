// Selecionar os itens do menu
var menuItem = document.querySelectorAll('.linksOng');

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

// Expandir o menu 
var btnAbrir = document.querySelector('#btn-abrir');
var menuSide = document.querySelector('.navbarOng');

if (btnAbrir) {
    btnAbrir.addEventListener('click', function () {
        menuSide.classList.toggle('expandir');
    });
}

// Gerenciar exibição de conteúdos

const links = document.querySelectorAll(".linksOng");
const conteudos = document.querySelectorAll(".conteudo");

links.forEach((link, index) => {
    link.addEventListener("click", () => {
        // remove destaque do menu
        links.forEach(l => l.classList.remove("ativo"));
        link.classList.add("ativo");

        // esconde tudo
        conteudos.forEach(c => c.classList.remove("ativo"));

        // mostra o conteúdo correspondente (pela ordem)
        conteudos[index].classList.add("ativo");
    });
});
