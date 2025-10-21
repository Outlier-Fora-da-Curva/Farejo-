// ...existing code...
import Cliente from '../../models/Cliente.js';
import chalk from 'chalk';

export function perfisUsuario(app, __dirname) {
    app.get("/perfisUsuario", async (req, res) => {
        try {
            const { count, rows } = await Cliente.findAndCountAll({
                attributes: ['idCliente', 'nome', 'email', 'cidade', 'uf', 'createdAt']
            });

            console.log(chalk.green(`Perfis encontrados: ${count}`));
            console.log(chalk.blue(JSON.stringify(rows, null, 2)));

            res.json({ count, users: rows });
        } catch (err) {
            console.log(chalk.red('Erro ao buscar perfis:'), err);
            res.status(500).json({ error: err.message });
        }
    });
}