import Administrador from '../../../models/Administrador.js';

export function loginAdm(app, __dirname) {
    // login adm
    app.post("/loginAdm", async (req, res) => {
    
      const { email, password } = req.body;
    
      try {
        const adm = await Administrador.findOne({
          where: {
            email: email,
            senha: password
          }
        });
    
        if (adm) {
          req.session.nome = adm.nome;
          req.session.email = adm.email;
          res.redirect('/dashAdm');
        } else {
          res.redirect('/loginAdm');
        }
      } catch (err) {
        console.error("Erro na consulta ao banco de dados:", err);
        res.redirect("/loginAdm");
      }
    });
    
}
