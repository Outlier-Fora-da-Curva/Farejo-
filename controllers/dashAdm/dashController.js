import { contagem } from "./contagemCadastro.js";
import { interacoes } from "./dataGrafico.js";
import { perfisAdm } from "./perfisDash.js";
import { aprovacao } from "./aprovacao.js";
import { animaisPost } from "./animaisPost.js";
import { editarPerfil } from "./editarPerfil.js";
import { tabAdm } from "./tabAdm.js";

export default function defineDashboard(app, __dirname) {
  contagem(app, __dirname);
  interacoes(app, __dirname);
  perfisAdm(app, __dirname);
  aprovacao(app, __dirname);
  animaisPost(app, __dirname);
  editarPerfil(app, __dirname);
  tabAdm(app, __dirname);
}