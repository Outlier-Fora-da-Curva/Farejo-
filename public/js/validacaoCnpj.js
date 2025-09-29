function validarCNPJ(cnpj) {
cnpj = cnpj.replace(/\D/g, ''); // remove tudo que não é número

if (cnpj.length !== 14) return false;
if (/^(\d)\1{13}$/.test(cnpj)) return false; // rejeita sequências tipo 000000...

// cálculo do 1º dígito verificador
let tamanho = 12;
let numeros = cnpj.substring(0, tamanho);
let digitos = cnpj.substring(tamanho);
let soma = 0;
let pos = tamanho - 7;

for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
}

let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
if (resultado != digitos.charAt(0)) return false;

// cálculo do 2º dígito verificador
tamanho = tamanho + 1;
numeros = cnpj.substring(0, tamanho);
soma = 0;
pos = tamanho - 7;

for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
}

resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
if (resultado != digitos.charAt(1)) return false;

return true;
}

document.getElementById("cadastroForm").addEventListener("submit", function (e) {
const cnpj = document.getElementById("cnpj").value;
const erro = document.getElementById("erroCNPJ");

if (!validarCNPJ(cnpj)) {
    e.preventDefault(); // impede envio
    erro.style.display = "block"; // mostra mensagem de erro
} else {
    erro.style.display = "none"; // esconde mensagem e envia
}
});