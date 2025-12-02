import Ong from '../../../models/Ong.js';

export function loginOng(app, __dirname) {
    // login ong
    app.post("/loginOng", async (req, res) => {

    const { cnpj, password } = req.body;

    try {
        const ong = await Ong.findOne({
        where: {
            CNPJ: cnpj,
            senha: password
        }
        });

        if (ong) {
        // req.session.nome = ong.nom/e;
        // req.session.cnpj = ong.cnpj;

        req.session.Ong = {
            idOng: ong.idOng,
            nomeOng: ong.nomeOng,
            imagem: ong.imagem,
            email: ong.email,
            senha: ong.senha,               // Cuidado: só armazene senha se for necessário e de forma segura
            telefoneContato: ong.telefoneContato,
            cnpj: ong.cnpj,
            cep: ong.cep,
            rua: ong.rua,
            numero: ong.numero,
            cidade: ong.cidade,
            uf: ong.uf,
            complemento: ong.complemento,
            bairro: ong.bairro,
            descricao: ong.descricao,
            status: ong.status
        };

        console.log('Sessão após login:', req.session);

        res.redirect('/dashOng');
        } else {
        res.redirect('http://localhost:3000/loginOng');
        }
    } catch (err) {
        console.error("Erro na consulta ao banco de dados:", err);
        res.redirect("http://localhost:3000/loginOng");
    }
    });
}
