import Sequelize from 'sequelize';
import db from './db.js';
import Ong from './Ong.js';

const Publicacao = db.define("publicacoes", {
  idPublicacao: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  img: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  titulo: {
    type: Sequelize.STRING(150),
    allowNull: false
  },
  numSalvos: {
  type: Sequelize.INTEGER,
  allowNull: false,
  defaultValue: 0
},
  dataPublicacao: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  nomeOng: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  fotoPerfilOng: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  idOng: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Ong,
      key: 'idOng'
    }
  }
});

Ong.hasMany(Publicacao, {
  foreignKey: 'idOng'
});

Publicacao.belongsTo(Ong, {
  foreignKey: 'idOng'
});

Publicacao.sync();

export default Publicacao;