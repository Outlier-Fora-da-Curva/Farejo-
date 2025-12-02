import Cliente from '../../models/Cliente.js';
import Ong from '../../models/Ong.js';
import Animais from '../../models/Animais.js';
import Evento from '../../models/Eventos.js';
import chalk from 'chalk';
import Sequelize, { where } from 'sequelize';
const { Op, fn, col } = Sequelize;

export function interacoes(app, __dirname) {

    app.get("/dadosGrafico", async (req, res) => {
        try {
            const anoAtual = new Date().getFullYear();

            // Query para Clientes por mês
            const clientesPorMes = await Cliente.findAll({
                attributes: [
                    [fn('MONTH', col('createdAt')), 'mes'],
                    [fn('COUNT', '*'), 'total']
                ],
                where: {
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

            // Query para ONGs por mês
            const ongsPorMes = await Ong.findAll({
                attributes: [
                    [fn('MONTH', col('createdAt')), 'mes'],
                    [fn('COUNT', '*'), 'total']
                ],
                where: {
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

            // Query para Animais por mês
            const animaisPorMes = await Animais.findAll({
                attributes: [
                    [fn('MONTH', col('createdAt')), 'mes'],
                    [fn('COUNT', '*'), 'total']
                ],
                where: {
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

            // Inicializa array com todos os meses
            const meses = Array(12).fill(0).map((_, i) => ({
                mes: i + 1,
                clientes: 0,
                ongs: 0,
                animais: 0
            }));

            // Preenche os dados dos clientes
            clientesPorMes.forEach(item => {
                meses[item.mes - 1].clientes = parseInt(item.total);
            });

            // Preenche os dados das ONGs
            ongsPorMes.forEach(item => {
                meses[item.mes - 1].ongs = parseInt(item.total);
            });

            // Preenche os dados dos Animais
            animaisPorMes.forEach(item => {
                meses[item.mes - 1].animais = parseInt(item.total);
            });

            // Formata os dados para o Chart.js
            const dadosGrafico = {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [
                    {
                        label: 'Usuários',
                        data: meses.map(m => m.clientes),
                        borderColor: '#da6200ff',
                        tension: 0.1
                    },
                    {
                        label: 'ONGs',
                        data: meses.map(m => m.ongs),
                        borderColor: '#7e3b0eff',
                        tension: 0.1
                    },
                    {
                        label: 'Animais',
                        data: meses.map(m => m.animais),
                        borderColor: '#e49058ff',
                        tension: 0.1
                    }
                ]
            };

            res.json(dadosGrafico);

        } catch (err) {
            console.log(chalk.red('Erro ao buscar dados do gráfico:'), err);
            res.status(500).json({ error: err.message });
        }
    });
    app.get("/dadosGraficoPizza", async (req, res) => {
        try {
            const totalUsuarios = await Cliente.count();
            const totalOngs = await Ong.count();
            const totalAnimais = await Animais.count();

            const dadosGraficoPizza = {
                labels: ['Usuários', 'ONGs', 'Animais'],
                datasets: [
                    {
                        data: [totalUsuarios, totalOngs, totalAnimais],
                        backgroundColor: ['#da6200ff', '#7e3b0eff', '#e49058ff']
                    }
                ]
            };

            res.json(dadosGraficoPizza);
        } catch (err) {
            console.log(chalk.red('Erro ao buscar dados do gráfico de pizza:'), err);
            res.status(500).json({ error: err.message });
        }
    });
    app.get("/dadosAnimais", async (req, res) => {
        try {
            const totalAnimais = await Animais.count();
            res.json({ totalAnimais });
        } catch (err) {
            console.log(chalk.red('Erro ao buscar dados dos animais:'), err);
            res.status(500).json({ error: err.message });
        }
    });
    app.get("/dadosOngs", async (req, res) => {
        try {
            const totalOngs = await Ong.count();
            res.json({ totalOngs });
        } catch (err) {
            console.log(chalk.red('Erro ao buscar dados dos animais:'), err);
            res.status(500).json({ error: err.message });
        }
    });
    app.get("/dadosEventos", async (req, res) => {
        try {
            const totalEventos = await Evento.count();
            res.json({ totalEventos });
        } catch (err) {
            console.log(chalk.red('Erro ao buscar dados dos animais:'), err);
            res.status(500).json({ error: err.message });
        }
    });
    app.get('/tipoAnimais', async (req, res) => {
        try {
            // Contar animais por tipo
            const cachorro = await Animais.count({
                where: { tipo: 'Cachorro' }
            });

            const gato = await Animais.count({
                where: { tipo: 'Gato' }
            });

            const outros = await Animais.count({
                where: {
                    tipo: {
                        [Op.notIn]: ['Cachorro', 'Gato']
                    }
                }
            });

            // Retornar em formato Chart.js
            const dados = {
                labels: ['Cachorro', 'Gato', 'Outros'],
                datasets: [{
                    data: [cachorro, gato, outros],
                    backgroundColor: ['#da6200ff', '#7e3b0eff', '#e49058ff']
                }]
            };

            res.json(dados);
        } catch (err) {
            console.log(chalk.red('Erro ao buscar tipos de animais:'), err);
            res.status(500).json({ error: err.message });
        }
    });
}