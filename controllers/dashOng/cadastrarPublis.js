import fs from "fs";
import multer from "multer";
import path from "path";
import Publicacao from '../../models/Publicacoes.js';
import Ong from '../../models/Ong.js';
import upload from '../../config/multer.js';


export function publicacoes(app, __dirname) {
    app.get("/publicacoes", (req, res) => {
        res.sendFile(path.join(__dirname, "views/dashOng", "publicacoes.html"));
    });

    app.post("/cadastrarPublicacao", upload.single("img"), async (req, res) => { 

        try {
            const novaPubli = await Publicacao.create({
                titulo: req.body.titulo,
                img: req.file ? `uploads/${req.file.filename}` : null, // caminho salvo no banco
                descricao: req.body.descricao,
                nomeOng: req.session.Ong.nomeOng,
                idOng: req.session.Ong.idOng,
                fotoPerfilOng: req.session.Ong.imagem
            });
            res.redirect('/publicacoes?sucesso=1');

        } catch (err) {
            console.error(err);
            res.status(400).send("Erro ao cadastrar Publicação");
        }
    });

    app.get("/api/publicacoes", async (req, res) => {
    try {

      console.log("Sessão completa:", req.session);

      const idOng = Number(req.session?.Ong?.idOng);

      if (!idOng) {
        return res.status(401).json({ error: "ONG não logada" });
      }

      const publicacoes = await Publicacao.findAll({
        where: { idOng: idOng }
      });

      res.json(publicacoes);
    } catch (err) {
      console.error("Erro ao buscar publicações:", err);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  });

}
