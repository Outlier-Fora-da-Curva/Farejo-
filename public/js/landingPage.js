// Menu hamburguer
const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector("header nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("ativo");
});





//carrossel
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.remove("ativo");
    dots[idx].classList.remove("ativo");
    if (idx === i) {
      slide.classList.add("ativo");
      dots[idx].classList.add("ativo");
    }
  });
}

document.querySelector(".next").addEventListener("click", () => {
  index = (index + 1) % slides.length;
  showSlide(index);
});

document.querySelector(".prev").addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
});

dots.forEach((dot, idx) => {
  dot.addEventListener("click", () => {
    index = idx;
    showSlide(index);
  });
});

