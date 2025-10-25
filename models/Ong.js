import Sequelize from 'sequelize';
import db from './db.js';

const Ong = db.define("ongs", {
  idOng: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomeOng: {
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
  nomeResponsavel: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  cpfResponsavel: {
    type: Sequelize.CHAR(14),
    allowNull: false,
    unique: true
  },
  telefoneContato: {
    type: Sequelize.CHAR(12),
    allowNull: false
  },
  CNPJ: {
    type: Sequelize.CHAR(18),
    allowNull: false,
    unique: true
  },
  CEP: {
    type: Sequelize.CHAR(8)
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
  UF: {
    type: Sequelize.CHAR(2)
  },
  complemento: {
    type: Sequelize.STRING(100)
  },
  bairro: {
    type: Sequelize.STRING(100)
  },
  descricao: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "pendente" 
  }

});

Ong.sync();

export default Ong;
