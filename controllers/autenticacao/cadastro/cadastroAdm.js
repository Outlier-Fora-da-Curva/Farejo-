import path from "path";
import Administrador from '../../../models/Administrador.js';

export function cadastroAdm(app, __dirname) {
  //adm
    app.get("/cadastroAdm", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "cadastroAdm.html"));
    });

    app.post("/cadastrarAdm", async (req, res) => {

        try {
            const novoAdm = await Administrador.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
            });
            res.redirect('/loginAdm?sucesso=1');

        } catch (err) {
            console.error(err);
            res.status(400).send("Erro ao cadastrar administrador");
        }

    });
}