// async function carregarNumeroPostagens(idOng) {
//     const res = await fetch(`/api/total-publicacoes/${idOng}`);
//     const data = await res.json();
//     const numeroFinal = data.total;

//     const numeroElemento = document.querySelector('#numPost .numero');
//     let contador = 0;
//     const duracao = 1500; // duração da animação em ms
//     const passo = Math.ceil(numeroFinal / (duracao / 30)); // 30ms por frame

//     const animar = setInterval(() => {
//         contador += passo;
//         if (contador >= numeroFinal) {
//             contador = numeroFinal;
//             clearInterval(animar);
//         }
//         numeroElemento.textContent = contador;
//     }, 30);
// }

// Para teste, coloca o id da ONG 1 manualmente
//carregarNumeroPostagens(1);

async function carregarNumeroPostagens(idOng) {
    // busca do backend
    const res = await fetch(`/api/total-publicacoes/${idOng}`);
    const data = await res.json();
    const numeroFinal = data.total;

    const numeroElemento = document.querySelector('#numPost .numero');
    let contador = 0;
    const duracao = 1500; // duração da animação em ms
    const passo = Math.ceil(numeroFinal / (duracao / 30)); // 30ms por frame

    const animar = setInterval(() => {
        contador += passo;
        if (contador >= numeroFinal) {
            contador = numeroFinal;
            clearInterval(animar);
        }
        numeroElemento.textContent = contador;
    }, 30);
}

// chamar a função passando o id da ONG do admin logado
carregarNumeroPostagens(1); // exemplo: idOng = 1

