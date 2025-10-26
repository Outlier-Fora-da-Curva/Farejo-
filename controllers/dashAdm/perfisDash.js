import Ong from '../../models/Ong.js';
import Cliente from '../../models/Cliente.js';
import chalk from 'chalk';

export function perfisAdm(app, __dirname) {
    app.get("/perfisUsuario", async (req, res) => {
        try {
            const { count, rows } = await Cliente.findAndCountAll({
                attributes: ['idCliente', 'nome', 'email', 'cidade', 'uf', 'createdAt']
            });
            
            // console.log(chalk.green(`Perfis encontrados: ${count}`));
            // console.log(chalk.blue(JSON.stringify(rows, null, 2)));

            res.json({ count, users: rows });
        } catch (err) {
            console.log(chalk.red('Erro ao buscar perfis:'), err);
            res.status(500).json({ error: err.message });
        }
    });
    app.get("/perfisOng", async (req, res) => {
        try {
            const { count, rows } = await Ong.findAndCountAll({
                attributes: ['idOng', 'nomeOng', 'email', 'cidade', 'uf', 'createdAt']
            });
            
            // console.log(chalk.green(`Perfis encontrados: ${count}`));
            // console.log(chalk.blue(JSON.stringify(rows, null, 2)));

            res.json({ count, users: rows });
        } catch (err) {
            console.log(chalk.red('Erro ao buscar perfis:'), err);
            res.status(500).json({ error: err.message });
        }
    });
}