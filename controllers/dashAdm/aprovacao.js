
import Ong from '../../models/Ong.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "farejo.corporativo@gmail.com",
            pass: "lxfs mxly zzti krkg"
        }
    });


function emailAprovado(email, nomeOng) {
    const mailOptions = {
        from: '"Farejo" <farejo.corporativo@gmail.com>',
        to: email,
        subject: "✅ Seu cadastro foi aprovado!",
        text: `Olá, ${nomeOng} 💚

Temos uma ótima notícia: o seu cadastro foi aprovado pela nossa equipe! 🎉

Agora você já pode acessar o painel da sua conta, publicar informações sobre sua ONG e interagir com a comunidade.


Seja muito bem-vindo(a) à plataforma Farejo — juntos, fazemos a diferença! 🌍✨

Com carinho,
Equipe Farejo`
};
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
}

function emailRecusado(email, nomeOng) {
    const mailOptions = {
        from: '"Farejo" <farejo.corporativo@gmail.com>',
        to: email,
        subject: "❌ Atualização sobre o seu cadastro na Farejo",
        text: `Olá, ${nomeOng} 🌿

Agradecemos o seu interesse em fazer parte da nossa plataforma e o envio das informações de cadastro.

Após a análise da equipe administrativa, infelizmente o seu cadastro **não pôde ser aprovado neste momento**.

Essa decisão pode ter ocorrido por inconsistências nas informações enviadas ou por não atender a alguns dos critérios necessários para o credenciamento.

🔄 Caso deseje revisar seus dados e tentar novamente, basta acessar nosso site e reenviar sua solicitação de cadastro.

Agradecemos sua compreensão e desejamos muito sucesso nas suas ações em prol do bem-estar animal. 💚

Atenciosamente,
Equipe Farejo`
};
}

export function aprovacao(app, __dirname) {
    app.get("/aprovacao", async (req, res) => {
        try {
            const { count, rows } = await Ong.findAndCountAll({
                attributes: ['idOng', 'nomeOng', 'email', 'CNPJ', 'nomeResponsavel', 'cpfResponsavel', 'CEP', 'cidade', 'UF', 'status']
            });

            res.json({ count, ongs: rows });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.post("/aprovacao/aprovar/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const ong = await Ong.findByPk(id);

            if (!ong) {
                return res.status(404).json({ error: 'ONG não encontrada' });
            }
            await Ong.update({ status: 'aprovado' }, { where: { idOng: id } });
            emailAprovado(ong.email, ong.nomeOng);
            res.json({ message: 1 });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    app.delete("/aprovacao/deletar/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const ong = await Ong.findByPk(id);

            if (!ong) {
                return res.status(404).json({ error: 'ONG não encontrada' });
            }

            emailRecusado(ong.email, ong.nomeOng);
            await Ong.destroy({ where: { idOng: id } });

            res.json({ message: 'ONG recusada e excluída com sucesso.' });
        } catch (err) {
            console.error('Erro ao excluir ONG:', err);
            res.status(500).json({ error: err.message });
        }
    });

}
