import { where } from 'sequelize';
import Animal from '../../models/Animais.js';
import Evento from '../../models/Eventos.js';
import Publicacao from '../../models/Publicacoes.js';

export function contagemNumerosOng(app, __dirname) {
    app.get("/contagemOng", async (req, res) => {

        // console.log('Sessão atual:', req.session);
        
        try {

            const idOng = Number(req.session?.Ong?.idOng);
            console.log('idOng:', idOng);
            // const idOng = req.session?.Ong?.idOng; 

            const contagemAnimais = await Animal.findAndCountAll({ where: { idOng: idOng } });
            const contagemAnimaisDisponiveis = await Animal.findAndCountAll({ where: { idOng: idOng , status: 'Disponível' } });
            const contagemAnimaisAdotados = await Animal.findAndCountAll({ where: { idOng: idOng , status: 'Adotado' } });
            const contagemEventos = await Evento.findAndCountAll({ where: { idOng: idOng } });
            const contagemPublicacoes = await Publicacao.findAndCountAll({ where: { idOng: idOng } });
            
            
            const contagem = {
                animais: contagemAnimais.count,
                animaisDisponiveis: contagemAnimaisDisponiveis.count,
                animaisAdotados: contagemAnimaisAdotados.count,
                eventos: contagemEventos.count,
                publicacoes: contagemPublicacoes.count,
            };
            res.json(contagem);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
