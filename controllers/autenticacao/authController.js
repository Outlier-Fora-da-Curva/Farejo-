import { definirRotasCadastro } from "./cadastro/cadastroController.js";
import { definirRotasLogin } from "./login/loginController.js";

export default function defineAutenticacao(app, __dirname) {
  // só chama as funções de cada módulo
  definirRotasCadastro(app, __dirname);
  definirRotasLogin(app, __dirname);
}
