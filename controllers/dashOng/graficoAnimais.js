import Animais from '../../models/Animais.js';
import chalk from 'chalk';
import Sequelize from 'sequelize';
const { Op, fn, col } = Sequelize;

export function graficoAnimais(app, __dirname) {

    app.get("/graficosOngAnimais", async (req, res) => {
        try {
            const anoAtual = new Date().getFullYear();

            const idOng = Number(req.session?.Ong?.idOng); // Verifica o ID da ONG na sessão
            if (!idOng) {
                return res.status(401).json({ error: 'ONG não autenticada' });
            }

            // Query para Animais CADASTRADOS por mês
            const animaisCadastrados = await Animais.findAll({
                attributes: [
                    [fn('MONTH', col('createdAt')), 'mes'],
                    [fn('COUNT', '*'), 'total']
                ],
                where: {
                    idOng: idOng, 
                    createdAt: {
                        [Op.between]: [
                            new Date(anoAtual, 0, 1),
                            new Date(anoAtual, 11, 31, 23, 59, 59)
                        ]
                    }
                },
                group: [fn('MONTH', col('createdAt'))],
                raw: true
            });

            // Query para Animais ADOTADOS por mês
            const animaisAdotados = await Animais.findAll({
                attributes: [
                    [fn('MONTH', col('dataAdocao')), 'mes'],
                    [fn('COUNT', '*'), 'total']
                ],
                where: {
                    idOng: idOng, 
                    status: 'Adotado',
                    dataAdocao: {
                        [Op.between]: [
                            new Date(anoAtual, 0, 1),
                            new Date(anoAtual, 11, 31, 23, 59, 59)
                        ]
                    }
                },
                group: [fn('MONTH', col('dataAdocao'))],
                raw: true
            });


            
            // Inicializa array com todos os meses
            const meses = Array(12).fill(0).map((_, i) => ({
                mes: i + 1,
                animaisCadastrados: 0,
                animaisAdotados: 0,
            }));

            // Preenche os dados dos animais cadastrados
            animaisCadastrados.forEach(item => {
                meses[item.mes - 1].animaisCadastrados = parseInt(item.total);
            });

            // Preenche os dados dos animais adotados
            animaisAdotados.forEach(item => {
                meses[item.mes - 1].animaisAdotados = parseInt(item.total);
            });

            // Formata os dados para o Chart.js
            const dadosGrafico = {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [
                    {
                        label: 'Animais Cadastrados',
                        data: meses.map(m => m.animaisCadastrados),
                        backgroundColor: '#da6200ff',
                        borderColor: '#da6200ff',
                        borderWidth: 1
                    },
                    {
                        label: 'Animais Adotados',
                        data: meses.map(m => m.animaisAdotados),
                        backgroundColor: '#3d1d02ff',
                        borderColor: 'rgba(61, 29, 2, 1)',
                        borderWidth: 1
                    },
                ]
            };

            res.json(dadosGrafico);

        } catch (err) {
            console.log(chalk.red('Erro ao buscar dados do gráfico:'), err);
            res.status(500).json({ error: err.message });
        }
    });
}
