import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from "url";
import defineRoutes from "./controllers/rotas.js";

// recriando __dirname e __filename no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import Cliente from './models/Cliente.js';
import Administrador from './models/Administrador.js';
import Ong from './models/Ong.js';

// importação do banco
import db from './models/db.js';
// import conexao from './conexao.js'; // se precisar depois

const app = express();

//chama os arquivos css, js e img
app.use(express.static(path.join(__dirname, "public")));


app.use(session({
    secret: 'chave',
    resave: false,
    saveUninitialized: true
}));


//interpretar os dados do html
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


export { app };

defineRoutes(app, __dirname);

//rotas principais
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/landpage", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "landpage.html"));
});

//dashboards
app.get("/dashAdm", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "dashAdm.html"));
});

app.get("/dashOng", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "dashOng.html"));
});

//animais
app.get("/animaisOng", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "animaisOng.html"));
});

//feed
app.get("/feed", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "feed.html"));
});

//publicidade
app.get("/publicidade", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "publicidade.html"));
});



// Rotas estaticas de login
app.get("/loginAdm", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "loginAdm.html"));
});

app.get("/loginOng", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "loginOng.html"));
});

app.get("/loginUsuario", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "loginUsuario.html"));
});



//perfis
app.get("/perfilOng", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "perfilOng.html"));
});

app.get("/perfilAdm", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "perfilAdm.html"));
});

app.get("/perfilUsuario", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "perfilUsuario.html"));
});



// conferir login
app.get('/session', (req, res) => {
  if (req.session.nome) {
    res.json({ nome: req.session.nome }); // envia o nome se estiver logado
  } else {
    res.json({ nome: null }); // null se não estiver logado
  }
});


//porta q vai rodar
const port = 3000;

app.listen(port, ()=> [
    console.log(`Servidor rodando em http://localhost:${port}`)
]);