import Cliente from '../../models/Cliente.js';
import Ong from '../../models/Ong.js';

export function interacoes(app, __dirname) {
    app.get("/interacoes", async (req, res) => {
        try {
            const contagemUser = await Cliente.findAndCountAll();
            const contagemOng = await Ong.findAndCountAll();
            const contagem = {
                contagem: contagemUser.count + contagemOng.count,
            };
            res.json(contagem);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
