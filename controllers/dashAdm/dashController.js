import { contagem } from "./contagemCadastro.js";
import { interacoes } from "./dataGrafico.js";

export default function defineDashboard(app, __dirname) {
  contagem(app, __dirname);
  interacoes(app, __dirname);
}
