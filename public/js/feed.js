document.addEventListener("DOMContentLoaded", () => {
    const filtros = document.querySelectorAll(".ord");

    filtros.forEach(filtro => {
      filtro.addEventListener("click", () => {
        filtro.classList.toggle("selecionado");
      });
    });
});

// Gerar lista de ongs 
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".perfilOngs");

  try {
    const resposta = await fetch("/ongs"); // ou "/feed/ongs", se usar app.use("/feed", ...)
    const ongs = await resposta.json();

    const lista = document.createElement("div");
    lista.classList.add("listaOngs");

    ongs.forEach(ong => {
      const ongItem = document.createElement("div");
      ongItem.classList.add("ongParceira");

      ongItem.innerHTML = `
        <img src="/imgs/logoFocinho.png" alt="${ong.nomeOng}" class="imgOngParceira">
        <span class="nomeOngParceira">${ong.nomeOng}</span>
      `;

      lista.appendChild(ongItem);
    });

    container.appendChild(lista);
  } catch (erro) {
    console.error("Erro ao carregar ONGs:", erro);
  }
});
