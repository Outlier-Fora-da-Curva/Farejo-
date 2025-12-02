import path from "path";
import Administrador from '../../../models/Administrador.js';

export function cadastroAdm(app, __dirname) {
  //adm
    app.post("/cadastrarAdm", async (req, res) => {

        try {
            const novoAdm = await Administrador.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            tipo:req.body.tipo
            });
            res.redirect('/dashAdm');

        } catch (err) {
            console.error(err);
            res.status(400).send("Erro ao cadastrar administrador");
        }

    });
}