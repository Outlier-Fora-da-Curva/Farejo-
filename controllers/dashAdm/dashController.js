import { contagem } from "./contagemCadastro.js";
import { interacoes } from "./dataGrafico.js";
import { perfisAdm } from "./perfisDash.js";
import { aprovacao } from "./aprovacao.js";

export default function defineDashboard(app, __dirname) {
  contagem(app, __dirname);
  interacoes(app, __dirname);
  perfisAdm(app, __dirname);
  aprovacao(app, __dirname);
}
