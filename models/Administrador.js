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
  }
});

Administrador.sync();
// Administrador.sync({ alter: true});

export default Administrador;
