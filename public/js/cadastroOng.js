document.addEventListener("DOMContentLoaded", function () {
  const etapas = [
    document.getElementById("etapa1"),
    document.getElementById("etapa2"),
    document.getElementById("etapa3")
  ];
  const steps = [
    document.querySelector(".step1"),
    document.querySelector(".step2"),
    document.querySelector(".step3")
  ];
  let etapaAtual = 0;

  // Seleciona todos os botões "Próximo"
  const btnsProximo = document.querySelectorAll("#btnProximo");

  btnsProximo.forEach(btn => {
    btn.addEventListener("click", function () {
      if (etapaAtual < etapas.length - 1) {
        etapas[etapaAtual].classList.add("hidden");
        etapaAtual++;
        etapas[etapaAtual].classList.remove("hidden");

        // Atualiza o indicador de etapas
        steps.forEach((step, idx) => {
          if (idx === etapaAtual) {
            step.classList.add("active");
          } else {
            step.classList.remove("active");
          }
        });
      }
    });
  });
});