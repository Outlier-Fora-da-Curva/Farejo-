
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