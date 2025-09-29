function validarCPF(cpf) {
cpf = cpf.replace(/\D/g, ''); // tira pontos e traços
if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

let soma = 0;
for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
let dig1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
if (dig1 != cpf[9]) return false;

soma = 0;
for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
let dig2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
if (dig2 != cpf[10]) return false;

return true;
}

document.getElementById("cadastroForm").addEventListener("submit", function (e) {
const cpf = document.getElementById("cpf").value;
const erro = document.getElementById("erroCPF");

if (!validarCPF(cpf)) {
    e.preventDefault(); // impede envio do form
    erro.style.display = "block"; // mostra mensagem
} else {
    erro.style.display = "none"; // esconde mensagem se estiver certo
}
});