document.addEventListener("DOMContentLoaded", function () {
  const etapa1 = document.getElementById("etapa1");
  const etapa2 = document.getElementById("etapa2");
  const btnProximo = document.getElementById("btnProximo");

  const step1 = document.querySelector(".step1");
  const step2 = document.querySelector(".step2");

  btnProximo.addEventListener("click", function () {
    etapa1.classList.add("hidden");
    etapa2.classList.remove("hidden");

    // Atualiza o indicador de etapas
    step1.classList.remove("active");
    step2.classList.add("active");
  });
});
