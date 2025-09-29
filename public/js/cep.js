document.getElementById("cep").addEventListener("blur", function() {
let cep = this.value.replace(/\D/g, ""); // só números

if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
        if (!data.erro) {
        document.getElementById("rua").value = data.logradouro;
        document.getElementById("bairro").value = data.bairro;
        document.getElementById("cidade").value = data.localidade;
        document.getElementById("uf").value = data.uf;
        document.getElementById("complemento").value = data.complemento;
        } else {
        alert("CEP não encontrado!");
        }
    })
    .catch(() => alert("Erro ao buscar o CEP."));
} else {
    alert("CEP inválido. Digite 8 números.");
}
});