// Espera a página carregar para garantir que o input exista
document.addEventListener("DOMContentLoaded", () => {
const inputTelefone = document.getElementById('telefone');

IMask(inputTelefone, {
    mask: [
    { mask: '(00) 0000-0000' },   // Telefone fixo
    { mask: '(00) 00000-0000' }   // Celular
    ],
    dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '');
    return dynamicMasked.compiledMasks[number.length > 10 ? 1 : 0];
    }
});
});

// === CPF ===
const inputCPF = document.getElementById("cpf");
if (inputCPF) {
IMask(inputCPF, {
    mask: "000.000.000-00"
});
}

// === CNPJ ===
const inputCNPJ = document.getElementById("cnpj");
if (inputCNPJ) {
IMask(inputCNPJ, {
    mask: "00.000.000/0000-00"
});
}

// === CEP ===
const inputCEP = document.getElementById("cep");
if (inputCEP) {
IMask(inputCEP, {
    mask: "00000-000"
});
}