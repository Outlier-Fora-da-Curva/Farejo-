import Cliente from '../../../models/Cliente.js';

export function loginUser(app, __dirname) {
    // login user
    app.post("/loginUsuario", async (req, res) => {

        console.log(req.body);

    const { email, password } = req.body;

    try {
        const user = await Cliente.findOne({
        where: {
            email: email,
            senha: password
        }
        });

        if (user) {
        req.session.nome = user.nome;
        req.session.email = user.email;
        res.redirect('/');
        } else {
        res.redirect('/loginUsuario');
        }
    } catch (err) {
        console.error("Erro na consulta ao banco de dados:", err);
        res.redirect("/loginUsuario");
    }
    });
}
