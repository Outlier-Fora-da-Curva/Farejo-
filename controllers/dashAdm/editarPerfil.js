import Administrador from '../../models/Administrador.js';
import upload from '../../config/multer.js';

export function editarPerfil(app, __dirname) {
    app.get('/getSessionIdAdm', (req, res) => {
        res.json({ idAdm: req.session.idAdm });
    });
    
    app.get("/edicaoAdm/:id", async (req, res) => {
        try {
            const admin = await Administrador.findByPk(req.session.idAdm);
            if (!admin) {
                return res.status(404).json({ error: "Administrador não encontrado" });
            }
            res.json(admin);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    
    app.put("/edicaoAdm/:id", upload.single("imagem"), async (req, res) => {
        try {
            const { nome, email, senha } = req.body;
            /*
            console.log('ID da URL:', req.params.id);
            console.log('ID da sessão:', req.session.idAdm);
            console.log('File:', req.file);
            */
            // usar ID da sessão, não da URL
            const admin = await Administrador.findByPk(req.session.idAdm);
            if (!admin) {
                return res.status(404).json({ error: "Administrador não encontrado" });
            }
            admin.nome = nome;
            admin.email = email;
            admin.senha = senha;
            
            // só atualiza foto se houver arquivo enviado
            if (req.file && req.file.filename) {
                admin.foto = `uploads/${req.file.filename}`;
            }
            
            await admin.save();
            res.json(admin);
        } catch (err) {
            console.error('Erro ao editar:', err);
            res.status(500).json({ error: err.message });
        }
    });
}