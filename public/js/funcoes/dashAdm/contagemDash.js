
async function carregarNumerosDash() {
  const resposta = await fetch('/contagem');
  const dados = await resposta.json();

  const numUser = document.getElementById('userData');
  const numOng = document.getElementById('ongData');
  numUser.textContent = dados.user;
  numOng.textContent = dados.ong;
}

carregarNumerosDash();
