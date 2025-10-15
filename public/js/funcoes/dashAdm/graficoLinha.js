
async function graficoLinha() {
  const resposta = await fetch('/interacoes');
  const dados = await resposta.json();


  return dados.contagem;
}

graficoLinha();

const ctx = document.getElementById('meuGrafico');

new Chart(ctx, {
    type: 'line',
    data: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [{
        label: 'Interações por Mês',
        data: graficoLinha(),
        backgroundColor: '#7B3C0A',
        borderColor: '#7B3C0A',
        borderWidth: 1
    }]
    },
    options: {
    responsive: true,
    scales: {
        y: {
        beginAtZero: true
        }
    }
    }
});