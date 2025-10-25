import Animal from '../../models/Animais.js';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(process.cwd(), "uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

export function cadastrarAnimaisOng(app, __dirname) {
  app.post('/cadastrarAnimaisOng', upload.single('profile_pic'), async (req, res) => {
    try {
      const { nome, raca, sexo, idade, porte, castrado, vacinado, idOng } = req.body;
      const foto = req.file ? req.file.filename : null;

      await Animal.create({
        nome,
        raca,
        sexo,
        idade,
        porte,
        castrado,
        vacinado,
        foto,
        idOng
      });

      res.redirect('/dashOng');
    } catch (err) {
      console.error('Erro ao cadastrar animal:', err);
      res.status(500).send('Erro ao cadastrar animal');
    }
  });
}
