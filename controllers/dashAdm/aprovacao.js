
import Ong from '../../models/Ong.js';
import chalk from 'chalk';

export function aprovacao(app, __dirname) {
    app.get("/aprovacao", async (req, res) => {
        try {
            const { count, rows } = await Ong.findAndCountAll({
                attributes: ['idOng', 'nomeOng', 'email', 'CNPJ', 'nomeResponsavel', 'cpfResponsavel', 'CEP', 'cidade', 'UF']
            });

            console.log(chalk.green(`Ongs encontrados: ${count}`));
            console.log(chalk.blue(JSON.stringify(rows, null, 2)));

            res.json({ count, ongs: rows });
        } catch (err) {
            console.log(chalk.red('Erro ao buscar ongs:'), err);
            res.status(500).json({ error: err.message });
        }
    });
}