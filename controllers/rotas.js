import defineAutenticacao from "./autenticacao/authController.js";
import defineDashboard from "./dashAdm/dashController.js";
import defineDashboardOng from "./dashOng/dashOngController.js";

export default function defineRoutes(app, __dirname) {
  // Aqui você só chama as funções de cada módulo
  defineAutenticacao(app, __dirname);
  defineDashboard(app, __dirname);
  defineDashboardOng(app, __dirname);
}
