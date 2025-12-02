import fs from "fs";
import multer from "multer";
import path from "path";
import Ong from '../../../models/Ong.js';
import nodemailer from "nodemailer";

// import upload from './config/multer.js';
import upload from '../../../config/multer.js';

function enviarEmailEspera(email, nomeOng) {
    // Configuração do transporte
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "farejo.corporativo@gmail.com",
            pass: "lxfs mxly zzti krkg"
        }
    });

    const mailOptions = {
        from: '"Farejo" <farejo.corporativo@gmail.com>', 
        to: email,
        subject: "🕓 Seu cadastro está em análise",
        text: `Olá, ${nomeOng}
Recebemos o seu cadastro em nossa plataforma e ele está sendo analisado pela equipe administrativa.

Essa verificação é necessária para garantir a segurança e a autenticidade das informações de todas as organizações cadastradas.

⏳ Assim que sua solicitação for avaliada, você receberá um novo e-mail informando o resultado da análise.

Agradecemos sua paciência e o interesse em fazer parte da nossa rede de apoio! 💛

Atenciosamente,
Equipe Farejo`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
}

export function cadastroOng(app, __dirname) {
    //ong
    app.get("/cadastroOng", (req, res) => {
    res.sendFile(path.join(__dirname, "views/cadastro", "cadastroOng.html"));
    });

    app.post("/cadastrarOng", upload.single("imagem"), async (req, res) => { 

        // TESTES
        // console.log("📁 req.file:", req.file);
        // console.log("📦 req.body:", req.body);

        try {
            const novaOng = await Ong.create({
                nomeOng: req.body.nomeOng,
                imagem: req.file ? `uploads/${req.file.filename}` : null, // caminho salvo no banco
                email: req.body.email,
                senha: req.body.senha,
                cnpj: req.body.cnpj,
                telefoneContato: req.body.telefoneContato,
                cep: req.body.cep,
                rua: req.body.rua,
                numero: req.body.numero,
                cidade: req.body.cidade,
                uf: req.body.uf,
                complemento: req.body.complemento,
                bairro: req.body.bairro,
                descricao: req.body.descricao,
                status: "Pendente"
            });
            res.redirect('/loginOng?sucesso=1');
            enviarEmailEspera(req.body.email, req.body.nomeOng);

        } catch (err) {
            console.error(err);
            res.status(400).send("Erro ao cadastrar Ong");
        }
    });

    app.get("/verificarEmailOng", async (req, res) => {
    
        try {
            const email = req.query.email;

            if (!email) {
                return res.json({ existe: false });
            }

            const ong = await Ong.findOne({ where: { email } });

            res.json({ existe: !!ong });
            
        } catch (err) {
            console.log(err);
            res.status(500).json({ erro: "Erro no servidor" });
        }

    });
}
