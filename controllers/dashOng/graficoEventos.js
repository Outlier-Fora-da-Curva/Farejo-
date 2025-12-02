import Evento from '../../models/Eventos.js';
import chalk from 'chalk';
import Sequelize from 'sequelize';
const { Op, fn, col } = Sequelize;

export function graficoEventos(app, __dirname) {

    app.get("/graficosOngEventos", async (req, res) => {
        try {
            const anoAtual = new Date().getFullYear();

            const idOng = Number(req.session?.Ong?.idOng); // Verifica o ID da ONG na sessão
            if (!idOng) {
                return res.status(401).json({ error: 'ONG não autenticada' });
            }

            // Query para eventos por mês
            const eventos = await Evento.findAll({
                attributes: [
                    [fn('MONTH', col('dataEvento')), 'mes'],
                    [fn('COUNT', '*'), 'total']
                ],
                where: {
                    idOng: idOng, 
                    dataEvento: {
                        [Op.between]: [
                            new Date(anoAtual, 0, 1),
                            new Date(anoAtual, 11, 31, 23, 59, 59)
                        ]
                    }
                },
                group: [fn('MONTH', col('dataEvento'))],
                raw: true
            });


            
            // Inicializa array com todos os meses
            const meses = Array(12).fill(0).map((_, i) => ({
                mes: i + 1,
                eventos: 0,
            }));

            // Preenche os dados dos eventos
            eventos.forEach(item => {
                meses[item.mes - 1].eventos = parseInt(item.total);
            });

            // Formata os dados para o Chart.js
            const dadosGrafico = {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [
                    {
                        label: 'Eventos',
                        data: meses.map(m => m.eventos),
                        borderColor: '#883f03ff',
                        backgroundColor: '#883f03a1',
                        pointStyle: 'circle',
                        pointRadius: 10,
                        pointHoverRadius: 15
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
