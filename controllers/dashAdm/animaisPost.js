import Ong from '../../models/Ong.js';
import Animais from '../../models/Animais.js';
import chalk from 'chalk';
import Sequelize from 'sequelize';

export function animaisPost(app, __dirname) {
    app.get("/acharAnimais", async (req, res) => {
        try {
            const rows = await Animais.findAll({
                attributes: ['idAnimal','nome','raca','idOng', 'foto','createdAt',
                    [Sequelize.literal('(SELECT nomeOng FROM ongs WHERE ongs.idOng = `animais`.`idOng`)'), 'nomeOng']
                ] 
            });

            //console.log(chalk.green(`Perfis encontrados: ${rows.length}`));
            //console.log(chalk.blue(JSON.stringify(rows, null, 2)));

            res.json({ count: rows.length, animais: rows });
        } catch (err) {
            console.log(chalk.red('Erro ao buscar animais:'), err);
            res.status(500).json({ error: err.message });
        }
    });

    app.post("/acharAnimais/aprovar/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const animal = await Animais.findByPk(id);

            if (!animal) {
                return res.status(404).json({ error: 'Animal não encontrado' });
            }
            await Animais.update({ status: 'Aprovado' }, { where: { idAnimal: id } });
            res.json({ message: 1 });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.delete("/acharAnimais/deletar/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const animal = await Animais.findByPk(id);

            if (!animal) {
                return res.status(404).json({ error: 'Animal não encontrado' });
            }

            await Animais.destroy({ where: { idAnimal: id } });

            res.json({ message: 'Animal recusado e excluído com sucesso.' });
        } catch (err) {
            console.error('Erro ao excluir Animal:', err);
            res.status(500).json({ error: err.message });
        }
    });
}