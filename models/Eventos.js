import Sequelize from 'sequelize';
import db from './db.js';
import Ong from './Ong.js';

const Evento = db.define("eventos", {
  idEvento: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomeEvento: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  descricaoEvento: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imagemEvento: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  dataEvento: {
    type: Sequelize.DATE,
    allowNull: false
  },
  localEvento: {
    type: Sequelize.STRING(255),
    allowNull: false
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

Ong.hasMany(Evento, {
  foreignKey: 'idOng'
});

Evento.belongsTo(Ong, {
  foreignKey: 'idOng'
});

Evento.sync();

export default Evento;