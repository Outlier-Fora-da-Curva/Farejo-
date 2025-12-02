import upload from "../../config/multer.js";
import path from "path";
import Ong from "../../models/Ong.js";

export function perfilOng(app, __dirname) {

    // -------- ROTA PARA EXIBIR A TELA --------
    app.get("/perfilOng", (req, res) => {
        res.sendFile(path.join(__dirname, "views/dashOng", "perfilOng.html"));
    });

    // -------- ROTA QUE DEVOLVE OS DADOS DA ONG LOGADA --------
    app.get("/perfilOng/dados", async (req, res) => {
        try {
            const idOng = req.session.Ong?.idOng;

            if (!idOng) {
                return res.status(401).json({ erro: "Usuário não logado" });
            }

            const ong = await Ong.findByPk(idOng);

            if (!ong) {
                return res.status(404).json({ erro: "ONG não encontrada" });
            }

            res.json(ong);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            res.status(500).json({ erro: "Erro ao buscar dados" });
        }
    });

    // -------- ROTA QUE ATUALIZA OS DADOS --------
    app.put("/atualizarOng", upload.single("imagem"), async (req, res) => {
    try {
        const idOng = req.session.Ong?.idOng;

        if (!idOng) {
            return res.status(401).json({ erro: "Usuário não logado" });
        }

        const ong = await Ong.findByPk(idOng);

        if (!ong) {
            return res.status(404).json({ erro: "ONG não encontrada" });
        }

        const campos = [
            "nomeOng", "email", "telefoneContato", "rua",
            "numero", "bairro", "cidade", "uf", "cep",
            "cnpj", "complemento", "descricao"
        ];

        let houveAlteracao = false;

        campos.forEach((campo) => {
            if (req.body[campo] !== undefined && req.body[campo] !== ong[campo]) {
                ong[campo] = req.body[campo];
                houveAlteracao = true;
            }
        });

        // FOTO NOVA
        if (req.file) {
            ong.imagem = `uploads/${req.file.filename}`;
            houveAlteracao = true;
        }

        if (!houveAlteracao) {
            return res.json({ msg: "Nenhuma alteração detectada" });
        }

        await ong.save();

        res.json({ msg: "Dados atualizados com sucesso!" });

    } catch (error) {
        console.error("Erro ao atualizar:", error);
        res.status(500).json({ erro: "Erro ao atualizar os dados da ONG" });
    }
});

}
