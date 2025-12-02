import Sequelize from 'sequelize';
import db from './db.js';

const Administrador = db.define("adms", {
  idAdministrador: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  },
  senha: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  tipo: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: 'Normal'
  },
  foto: {
    type: Sequelize.STRING(100),
    allowNull: true
  }, 
});

Administrador.sync({ alter: true })
  .then(async () => {
    const dadosAdms = [
      {
        nome: "Farejo Admin",
        email: "farejo.corporativo@gmail.com",              
        senha: "farejo2024@",
        tipo: "Geral",
        foto: null
      }
    ];

    for (const adms of dadosAdms) {
      await Administrador.findOrCreate({
        where: { email: adms.email },
        defaults: { 
          nome: adms.nome,
          email: adms.email,
          senha: adms.senha,
          tipo: adms.tipo ?? 'Geral',
          foto: adms.foto ?? null
        }
      });
    }
  })
  .catch(console.error);


export default Administrador;
 