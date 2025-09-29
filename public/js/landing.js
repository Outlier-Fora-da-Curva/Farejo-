document.getElementById('btnLand1').addEventListener('click', () => {
  window.location.href = '/inicial';
});


// Problemas
function toggleFAQ(header) {
  const faq = header.parentElement;
  const index = faq.dataset.index;
  const isActive = faq.classList.contains("active"); 

  const allFAQs = document.querySelectorAll(".faq");
  const allSegments = document.querySelectorAll(".barraProgresso");

  // fecha todos
  allFAQs.forEach(f => f.classList.remove("active"));
  allSegments.forEach(s => {
    s.style.backgroundColor = "#ccc";
    s.style.height = "30px";
  });

  // se o clicado não estava ativo, abre ele
  if (!isActive) {
    faq.classList.add("active");
    const segment = document.getElementById(`progress-${index}`);
    segment.style.backgroundColor = "#A03800";
    segment.style.height = "100%";
  }
}

///////////////////////////////////////////////////////////////
// Passo a passo
let index = 0;
let currentSession = null;

function atualizarPassos(sessao, i) {
  const passos = sessao.querySelectorAll(".passo");
  const bolinhas = sessao.querySelectorAll(".bolinha");

  passos.forEach((p, idx) => {
    p.className = "passo";
    bolinhas[idx].classList.remove("ativo");

    if (idx === i) {
      p.classList.add("ativo");
      bolinhas[idx].classList.add("ativo");
    } else if (idx === i - 1) {
      p.classList.add("anterior");
    } else if (idx === i + 1) {
      p.classList.add("proximo");
    }
  });
}

function initCarrossel(sessao) {
  const prevBtn = sessao.querySelector(".prev");
  const nextBtn = sessao.querySelector(".next");

  const totalPassos = sessao.querySelectorAll(".passo").length;

  prevBtn.onclick = () => {
    index = (index - 1 + totalPassos) % totalPassos;
    atualizarPassos(sessao, index);
  };

  nextBtn.onclick = () => {
    index = (index + 1) % totalPassos;
    atualizarPassos(sessao, index);
  };

  atualizarPassos(sessao, index);
}

function filterSelection(classe) {
  const secoes = document.querySelectorAll(".sessaoTutorial");
  const botoes = document.querySelectorAll(".filtro button");

  // Esconde todas
  secoes.forEach(secao => secao.classList.remove("show"));
  botoes.forEach(btn => btn.classList.remove("active"));

  // Mostra a selecionada
  const ativa = document.querySelector(`.sessaoTutorial.${classe}`);
  ativa.classList.add("show");

  // Ativa o botão clicado
  const btnAtivo = document.getElementById(classe);
  if (btnAtivo) btnAtivo.classList.add("active");

  // Reinicia índice e carrossel
  index = 0;
  currentSession = ativa;
  initCarrossel(currentSession);
}

// Inicia com usuário
document.addEventListener("DOMContentLoaded", () => {
  filterSelection("usuario");
});

/////////////////////////////////////////////////////////////////////////
// Números animados - impactos
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".numeroImpacto");

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const updateCounter = () => {
      const increment = Math.ceil(target / 100); // velocidade da contagem
      if (count < target) {
        count += increment;
        if (count > target) count = target;
        counter.textContent = `+${count}`;
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  });
});
