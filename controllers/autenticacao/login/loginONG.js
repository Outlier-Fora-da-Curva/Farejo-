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
        req.session.nome = ong.nome;
        req.session.cnpj = ong.cnpj;
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
