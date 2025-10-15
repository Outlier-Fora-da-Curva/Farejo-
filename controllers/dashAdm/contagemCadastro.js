import Cliente from '../../models/Cliente.js';
import Ong from '../../models/Ong.js';

export function contagem(app, __dirname) {
    app.get("/contagem", async (req, res) => {
        try {
            const contagemUser = await Cliente.findAndCountAll();
            const contagemOng = await Ong.findAndCountAll();
            const contagem = {
                user: contagemUser.count,
                ong: contagemOng.count,
            };
            res.json(contagem);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
