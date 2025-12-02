import upload from "../../config/multer.js";
import path from "path";
import Animal from "../../models/Animais.js";

export function perfilAnimal(app, __dirname) {


    app.get("/api/idEditarAnimal", async (req, res) => {
        try {
            const id = req.query.idAnimal;
            const animal = await Animal.findByPk(id);

            if (!animal) {
                return res.status(404).json({ erro: "Animal não encontrado" });
            }

            res.json(animal);

        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao buscar animal" });
        }
    });


    app.get("/editarAnimal", async (req, res) => {
        try {
            const idAnimal = req.query.idAnimal;

            const animal = await Animal.findByPk(idAnimal);

            if (!animal) {
                return res.status(404).send("Animal não encontrado");
            }

            // Renderiza a página de edição passando os dados
            // res.render("editarAnimal", { animal });
            res.sendFile(path.join(__dirname, "views/dashOng", "editarAnimal.html"));


        } catch (error) {
            console.error(error);
            res.status(500).send("Erro no servidor");
        }
    });


    app.put("/editarAnimal", upload.single("foto"), async (req, res) => {
        try {
            const id = req.body.idAnimal;
            const animal = await Animal.findByPk(id);

            if (!animal) {
                return res.status(404).json({ erro: "Animal não encontrado" });
            }

            const campos = ["nome","raca","sexo","idade", "tipo","porte","castrado","vacinado", "historia"];

            campos.forEach(campo => {
                if (req.body[campo] !== undefined) {
                    animal[campo] = req.body[campo];
                }
            });

            if (req.file) {
                animal.foto = `uploads/${req.file.filename}`;
            }

            await animal.save();

            res.json({ msg: "Animal atualizado com sucesso!" });

        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao atualizar animal" });
        }
    });


    app.delete("/excluirAnimal", async (req, res) => {
        try {
            const id = req.query.idAnimal;
            const animal = await Animal.findByPk(id);

            if (!animal) {
                return res.status(404).json({ erro: "Animal não encontrado" });
            }

            await animal.destroy();

            res.json({ msg: "Animal excluído com sucesso!" });

        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao excluir animal" });
        }
    });



}
