//import { loginAdm } from "./loginAdm.js";
//import { loginOng } from "./loginONG.js";
import { loginUser } from "./loginUser.js";

export function definirRotasLogin(app, __dirname) {
  //loginAdm(app, __dirname);
  //loginOng(app, __dirname);
  loginUser(app, __dirname);
}
