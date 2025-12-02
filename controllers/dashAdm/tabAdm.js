import Admin from '../../models/Administrador.js';
import chalk from 'chalk';
import Sequelize from 'sequelize';

export function tabAdm(app, __dirname) {
    app.get("/adminCadastrados", async (req, res) => {
        try {
            const { count, rows } = await Admin.findAndCountAll({
                attributes: ['idAdministrador','foto', 'nome', 'email', 'tipo']
            });
            
            // console.log(chalk.green(`Perfis encontrados: ${count}`));
            // console.log(chalk.blue(JSON.stringify(rows, null, 2)));
 
            res.json({ count, users: rows });
        } catch (err) {
            console.log(chalk.red('Erro ao buscar perfis:'), err);
            res.status(500).json({ error: err.message });
        }
    });
    app.delete("/deletarAdmin/:id", async (req, res) => {
        const adminId = req.params.id;
        try {
            const resultado = await Admin.destroy({
                where: { idAdministrador: adminId }
            });
            if (resultado) {
                res.status(200).json({ message: 'Administrador deletado com sucesso.' });
            } else {
                res.status(404).json({ message: 'Administrador não encontrado.' });
            }
        } catch (err) {
            console.log(chalk.red('Erro ao deletar administrador:'), err);
            res.status(500).json({ error: err.message });
        }
    });
}