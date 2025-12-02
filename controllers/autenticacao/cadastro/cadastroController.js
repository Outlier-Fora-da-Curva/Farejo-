import { cadastroAdm } from "./cadastroAdm.js";
import { cadastroOng } from "./cadastroONG.js";
import { cadastroUser } from "./cadastroUser.js";

export function definirRotasCadastro(app, __dirname) {
  cadastroAdm(app, __dirname);
  cadastroOng(app, __dirname);
  cadastroUser(app, __dirname);
}
