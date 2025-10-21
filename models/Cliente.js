import Sequelize from 'sequelize';
import db from './db.js';

const Cliente = db.define("clientes", {
  idCliente: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  cpf: {
    type: Sequelize.CHAR(14),
    allowNull: false,
    unique: true
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
  cep: {
    type: Sequelize.CHAR(11)
  },
  rua: {
    type: Sequelize.STRING(100)
  },
  numero: {
    type: Sequelize.STRING(10)
  },
  cidade: {
    type: Sequelize.STRING(100)
  },
  uf: {
    type: Sequelize.CHAR(2)
  },
  complemento: {
    type: Sequelize.STRING(100)
  },
  bairro: {
    type: Sequelize.STRING(100)
  }

});


Cliente.sync();
// Cliente.sync({ alter: true});

export default Cliente;
