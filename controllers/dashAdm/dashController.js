import { contagem } from "./contagemCadastro.js";
import { interacoes } from "./dataGrafico.js";
import { perfisUsuario } from "./perfisDash.js";

export default function defineDashboard(app, __dirname) {
  contagem(app, __dirname);
  interacoes(app, __dirname);
  perfisUsuario(app, __dirname);
}
