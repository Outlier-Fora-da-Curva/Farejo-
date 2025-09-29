import path from "path";
import Ong from '../../../models/Ong.js';

export function cadastroOng(app, __dirname) {
    //ong
    app.get("/cadastroOng", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "cadastroOng.html"));
    });

    app.post("/cadastrarOng", async (req, res) => {
        try {
            const novaOng = await Ong.create({
                nomeOng: req.body.nomeOng,
                email: req.body.email,
                senha: req.body.senha,
                CNPJ: req.body.cnpj,
                nomeResponsavel: req.body.nomeResponsavel,
                cpfResponsavel: req.body.cpfResponsavel,
                telefoneContato: req.body.telefoneContato,
                CEP: req.body.cep,
                rua: req.body.rua,
                numero: req.body.numero,
                cidade: req.body.cidade,
                UF: req.body.uf,
                complemento: req.body.complemento,
                bairro: req.body.bairro,
                descricao: req.body.descricao
            });
            res.redirect('/loginOng?sucesso=1');

        } catch (err) {
            console.error(err);
            res.status(400).send("Erro ao cadastrar Ong");
        }
    });
}
