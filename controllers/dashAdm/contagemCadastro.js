import Cliente from '../../models/Cliente.js';
import Ong from '../../models/Ong.js';
import Animal from '../../models/Animais.js';

export function contagem(app, __dirname) {
    app.get("/contagem", async (req, res) => {
        try {
            const contagemUser = await Cliente.findAndCountAll();
            const contagemOng = await Ong.findAndCountAll();
            const contagemAnimais = await Animal.findAndCountAll();
            
            const contagem = {
                user: contagemUser.count,
                ong: contagemOng.count,
                animais: contagemAnimais.count,
            };
            res.json(contagem);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
