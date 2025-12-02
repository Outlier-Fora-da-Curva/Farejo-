 import { cadastroAnimal } from "./cadastroAnimais.js";
 import { contagemNumerosOng } from "./contagemOng.js";
 import { graficoAnimais } from "./graficoAnimais.js";
 import { graficoEventos } from "./graficoEventos.js";
 import { perfilOng } from "./editarPerfil.js";
 import { perfilAnimal } from "./editarAnimal.js";
 import { publicacoes } from "./cadastrarPublis.js";
 
 
 export default function defineDashboardOng(app, __dirname) {
   cadastroAnimal(app, __dirname);
   contagemNumerosOng(app, __dirname);
   graficoAnimais(app, __dirname);
   graficoEventos(app, __dirname);
   perfilOng(app, __dirname);
   perfilAnimal(app, __dirname);
   publicacoes(app, __dirname);
 }
 