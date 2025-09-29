import path from "path";
import Cliente from '../../../models/Cliente.js';

export function cadastroUser(app, __dirname) {
    //usuario
    app.get("/cadastroUsuario", (req, res) => {
      res.sendFile(path.join(__dirname, "views", "cadastroUsuario.html"));
    });
    
    app.post("/cadastrarUsuario", async (req, res) => {
        try {
            console.log(req.body);
    
            const novoUsuario = await Cliente.create({
                nome: req.body.nome,
                cpf: req.body.cpf,
                email: req.body.email,
                senha: req.body.senha,
                cep: req.body.cep,
                rua: req.body.rua,
                numero: req.body.numero,
                cidade: req.body.cidade,
                uf: req.body.uf,
                complemento: req.body.complemento,
                bairro: req.body.bairro
            });
            res.redirect('/loginUsuario?sucesso=1');
    
        } catch (err) {
            console.error(err);
            res.status(400).send("Erro ao cadastrar usuário");
        }
    });
}