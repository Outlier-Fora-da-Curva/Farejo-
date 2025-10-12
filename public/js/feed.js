document.addEventListener("DOMContentLoaded", () => {
    const filtros = document.querySelectorAll(".ord");

    filtros.forEach(filtro => {
      filtro.addEventListener("click", () => {
        filtro.classList.toggle("selecionado");
      });
    });
});