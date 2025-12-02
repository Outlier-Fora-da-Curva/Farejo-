import fs from "fs";
import multer from "multer";
import path from "path";
import Animal from '../../models/Animais.js';
import Ong from '../../models/Ong.js';

import upload from '../../config/multer.js';


export function cadastroAnimal(app, __dirname) {
    app.get("/cadastroAnimal", (req, res) => {
    res.sendFile(path.join(__dirname, "views/dashOng", "cadastroAnimal.html"));
    });

    app.post("/cadastrarAnimal", upload.single("foto"), async (req, res) => { 

        try {
            const novoAnimal = await Animal.create({
                nome: req.body.nome,
                foto: req.file ? `uploads/${req.file.filename}` : null, // caminho salvo no banco
                raca: req.body.raca,
                sexo: req.body.sexo,
                idade: req.body.idade,
                tipo: req.body.tipo,
                porte: req.body.porte,
                castrado: req.body.castrado,
                vacinado: req.body.vacinado,
                status: 'Disponível',
                historia: req.body.historia,
                idOng: req.session.Ong.idOng,
            });
            res.redirect('/animaisOng?sucesso=1');

        } catch (err) {
            console.error(err);
            res.status(400).send("Erro ao cadastrar Animal");
        }
    });
}
