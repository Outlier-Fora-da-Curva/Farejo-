import express from 'express';
import session from 'express-session';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";
import defineRoutes from "./controllers/rotas.js";

import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3001 });
const clients = new Map();
let ongSocket = null;

function enviarListaOnline() {
    const onlineIds = [...clients.keys()];

    const message = JSON.stringify({
        tipo: "onlineUpdate",
        online: onlineIds
    });

    clients.forEach(ws => ws.send(message));
}


function send(ws, type, data) {
    ws.send(JSON.stringify({ type, ...data }));
}

wss.on("connection", async (ws, req) => {
    const search = req.url.split("?")[1];
    const params = new URLSearchParams(search);
    const role = params.get("role");
    const id = params.get("id");
    const nome = params.get("name");

    // ONG conectada
    if (role === "ong") {
        ongSocket = ws;
        console.log("ONG conectada");
    }

    // CLIENTE conectado
    if (role === "client") {
        clients.set(String(id), ws);
        console.log(`Cliente ${id} conectado`);

        const cliente = await Cliente.findOne({ where: { idCliente: id } });

        if (ongSocket) {
            send(ongSocket, "newClient", {
                idCliente: id,
                nome: cliente?.nome || nome,
                imagem: cliente?.imagem || "/imgs/userA.png"
            });
        }
    }

    // Atualiza a lista de online para todos
    const onlineIds = [...clients.keys()];
    const onlineMsg = JSON.stringify({
        type: "onlineUpdate",
        online: onlineIds
    });

    clients.forEach(c => c.send(onlineMsg));
    if (ongSocket) ongSocket.send(onlineMsg);

    // RECEBER MENSAGENS
    ws.on("message", message => {
        const data = JSON.parse(message);

        // Mensagem do cliente -> ONG
        if (data.type === "clientMessage") {

            if (ongSocket) {
                send(ongSocket, "clientMessage", {
                    idCliente: id,
                    nome: data.name,
                    img: data.img,
                    imagem: data.imagem,
                    message: data.message
                });
            }
        }


        // Mensagem da ONG -> Cliente
        if (data.type === "ongMessage") {
            const client = clients.get(String(data.to));

            if (client) {
                send(client, "ongMessage", {
                    idOng: data.from,      // <<< CORRIGIDO
                    nomeOng: data.name,
                    img: data.img,
                    message: data.message
                });
            }
        }
    });

    // QUANDO DESCONECTA
    ws.on("close", () => {
        clients.delete(String(id));
        console.log(`Cliente ${id} saiu`);

        const onlineIds = [...clients.keys()];
        const onlineMsg = JSON.stringify({
            type: "onlineUpdate",
            online: onlineIds
        });

        clients.forEach(c => c.send(onlineMsg));
        if (ongSocket) ongSocket.send(onlineMsg);

        if (ongSocket) {
            send(ongSocket, "clientDisconnected", { id });
        }
    });
});


// recriando _dirname e _filename no ESM
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

import Cliente from './models/Cliente.js';
import Administrador from './models/Administrador.js';
import Ong from './models/Ong.js';
import Animal from './models/Animais.js';
import Evento from './models/Eventos.js';
import Publicacao from './models/Publicacoes.js';

import db from './models/db.js';
import upload from './config/multer.js';

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(_dirname, "public")));
app.use("/uploads", express.static("uploads"));

app.use(session({
    secret: 'chave',
    resave: false,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export { app };

app.get('/api/ongs', async (req, res) => {
    const ongs = await Ong.findAll();
    res.json({ ongs });
});

app.get('/api/cliente', async (req, res) => {
    const clientes = await Cliente.findAll();
    res.json({ clientes });
});

app.get('/api/cliente/:id', async (req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findOne({ where: { idCliente: id } });
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
    res.json({ id: cliente.idCliente, nome: cliente.nome, imagem: cliente.imagem });
});

app.get("/api/ong/:id", async (req, res) => {
    const { id } = req.params;
    const ong = await Ong.findOne({ where: { idOng: id } });
    if (!ong) return res.status(404).json({ error: "ONG não encontrada" });
    res.json({ id: ong.idOng, nome: ong.nomeOng, imagem: ong.imagem });
});

app.get('/api/animais', async (req, res) => {
    try {
        const dados = await Animal.findAll();
        console.log('Animais cadastrados:', dados.map(a => a.nome));
        res.json({ animais: dados });
    } catch (err) {
        console.error('Erro ao buscar animais:', err);
        res.status(500).json({ erro: 'Erro ao buscar animais' });
    }
});

app.get("/api/animaisOng", async (req, res) => {
    try {
        const idOng = Number(req.session?.Ong?.idOng);
        if (!idOng) return res.status(401).json({ error: "ONG não logada" });

        const animais = await Animal.findAll({
            where: { idOng }
        });

        res.json(animais);
    } catch (err) {
        console.error("Erro ao buscar animais:", err);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

app.get('/api/eventos', async (req, res) => {
    try {
        const eventos = await Evento.findAll({
            include: { model: Ong, attributes: ['nomeOng'] }
        });
        res.json(eventos);
    } catch (err) {
        console.error('Erro ao buscar eventos:', err);
        res.status(500).json({ erro: 'Erro ao buscar eventos' });
    }
});

app.get('/api/publicacoes', async (req, res) => {
    const publicacoes = await Publicacao.findAll();
    res.json({ publicacoes });
});

defineRoutes(app, _dirname);

app.get("/", (req, res) => {
    res.sendFile(path.join(_dirname, "views/principais", "landpage.html"));
});

app.get("/inicial", (req, res) => {
    res.sendFile(path.join(_dirname, "views/principais", "index.html"));
});

app.get("/feed", (req, res) => {
    res.sendFile(path.join(_dirname, "views/principais", "feed.html"));
});

app.get("/perfilUsuario", (req, res) => {
    res.sendFile(path.join(_dirname, "views/principais", "perfilUsuario.html"));
});

app.get("/dashAdm", (req, res) => {
    res.sendFile(path.join(_dirname, "views/dashAdm", "dashAdm.html"));
});

app.get("/perfilAdm", (req, res) => {
    res.sendFile(path.join(_dirname, "views/dashAdm", "perfilAdm.html"));
});

app.get("/dashOng", (req, res) => {
    res.sendFile(path.join(_dirname, "views/dashOng", "dashOng.html"));
});

app.get("/animaisOng", (req, res) => {
    res.sendFile(path.join(_dirname, "views/dashOng", "animaisOng.html"));
});

app.get("/perfilOng", (req, res) => {
    res.sendFile(path.join(_dirname, "views/dashOng", "perfilOng.html"));
});

app.get("/publicidadeOng", (req, res) => {
    res.sendFile(path.join(_dirname, "views/dashOng", "publicidade.html"));
});

// app.get("/chat/:id", (req, res) => {
//     res.sendFile(path.join(_dirname, "views/principais", "chat.html"));
// });

// app.get("/chat", (req, res) => {
//     res.sendFile(path.join(_dirname, "views/principais", "chat.html"));
// });

app.get("/cuidadosPets", (req, res) => {
    res.sendFile(path.join(_dirname, "views/cuidados", "cuidadosPets.html"));
});

app.get("/alimentacaoSaudavel", (req, res) => {
    res.sendFile(path.join(_dirname, "views/cuidados", "alimntSaudavel.html"));
});

app.get("/higieneBanho", (req, res) => {
    res.sendFile(path.join(_dirname, "views/cuidados", "higieneBanho.html"));
});

app.get("/comportamento", (req, res) => {
    res.sendFile(path.join(_dirname, "views/cuidados", "comportamento.html"));
});

app.get("/brincadeiras", (req, res) => {
    res.sendFile(path.join(_dirname, "views/cuidados", "brincadeiras.html"));
});

app.get("/vacinacao", (req, res) => {
    res.sendFile(path.join(_dirname, "views/cuidados", "vacinacao.html"));
});

app.get("/passeios", (req, res) => {
    res.sendFile(path.join(_dirname, "views/cuidados", "passeios.html"));
});

app.get("/loginAdm", (req, res) => {
    res.sendFile(path.join(_dirname, "views/login", "loginAdm.html"));
});

app.get("/loginOng", (req, res) => {
    res.sendFile(path.join(_dirname, "views/login", "loginOng.html"));
});

app.get("/loginUsuario", (req, res) => {
    res.sendFile(path.join(_dirname, "views/login", "loginUsuario.html"));
});

app.get('/session', (req, res) => {
    if (req.session.nome) res.json({ nome: req.session.nome });
    else res.json({ nome: null });
});

app.get('/user', (req, res) => {
    if (req.session.nome) res.json({ nome: req.session.nome, imagem: req.session.imagem });
    else res.json({ nome: null, imagem: null });
});

// app.get('/logarChat', (req, res) => {
//     if (req.session.nome) res.json({ nome: req.session.nome, imagem: req.session.imagem });
//     else res.json({ nome: null, imagem: null });
// });

app.get("/logarChat", (req, res) => {
    
    if (!req.session.nome) {
        return res.json({ logado: false });
    }

    res.json({
        logado: true,
        id: req.session.idCliente || req.session.Cliente?.idCliente,
        nome: req.session.nome,
        imagem: req.session.imagem || "imgs/userA.png"
    });
});



app.get("/chat/:id", async (req, res) => {
    const id = req.params.id;
    const ong = await Ong.findByPk(id);
    if (!ong) return res.status(404).send("ONG não encontrada");

    const filePath = path.join(_dirname, "views/principais", "chat.html");
    let html = fs.readFileSync(filePath, "utf8");

    html = html
        .replace("{{ONG_NOME}}", ong.nome)
        .replace("{{ONG_IMG}}", ong.foto);

    res.send(html);
});

// Chat ong cliente 
app.get("/chatOng/:idCliente", async (req, res) => {
    const idCliente = req.params.idCliente;
    const filePath = path.join(_dirname, "views/principais", "chatOng.html");
    let html = fs.readFileSync(filePath, "utf8");

    // Pegar id da ONG da sessão
    const idOng = req.session?.Ong?.idOng || 0;

    html = html.replace("{{idOng}}", idOng);

    res.send(html);
});






app.get("/chatOng", (req, res) => {
    res.sendFile(path.join(_dirname, "views/principais", "chatOng.html"));
});

const port = 10000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});