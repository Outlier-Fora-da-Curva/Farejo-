import path from "path";
import Ong from '../../../models/Ong.js';
import nodemailer from "nodemailer";

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
                descricao: req.body.descricao,
                status: "pendente"
            });
            res.redirect('/loginOng?sucesso=1');
            enviarEmailEspera(req.body.email, req.body.nomeOng);

        } catch (err) {
            console.error(err);
            res.status(400).send("Erro ao cadastrar Ong");
        }
    });
}
