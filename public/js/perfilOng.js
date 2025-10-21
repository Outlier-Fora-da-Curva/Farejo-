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
            logo.src = "/imgs/perfilOng/logoFocinho.png";
        } else {
            logo.src = "/imgs/perfilOng/logoFarejo.png";
        }
    });
}








// Seleciona as abas e conteúdos
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        // Remove "active" de todas as abas e conteúdos
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        // Ativa a aba clicada
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
      });
    });