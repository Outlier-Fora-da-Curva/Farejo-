import path from "path";
import Cliente from '../../../models/Cliente.js';

// import upload from './config/multer.js';
import upload from '../../../config/multer.js';

export function cadastroUser(app, __dirname) {
    //usuario
    app.get("/cadastroUsuario", (req, res) => {
      res.sendFile(path.join(__dirname, "views/cadastro", "cadastroUsuario.html"));
    });
    
    app.post("/cadastrarUsuario",  upload.single("imagem"), async (req, res) => {
        try {
            console.log(req.body);
    
            const novoUsuario = await Cliente.create({
                nome: req.body.nome,
                cpf: req.body.cpf,
                imagem: req.file ? `uploads/${req.file.filename}` : null, // caminho salvo no banco
                email: req.body.email,
                senha: req.body.senha,
                preferenciaTipo: req.body.tipo,
                preferenciaPorte: req.body.porte,
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

    app.get("/verificarEmailUser", async (req, res) => {
    
    try {
        const email = req.query.email;

        if (!email) {
            return res.json({ existe: false });
        }

        const usuario = await Cliente.findOne({ where: { email } });

        res.json({ existe: !!usuario });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ erro: "Erro no servidor" });
    }

    });
}