import Sequelize from 'sequelize';
import db from './db.js';
import Ong from './Ong.js';

const Animal = db.define("animais", {
  idAnimal: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  foto: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  raca: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  sexo: {
    type: Sequelize.ENUM('Macho', 'Fêmea'),
    allowNull: false
  },
  idade: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  porte: {
    type: Sequelize.ENUM('Pequeno', 'Médio', 'Grande'),
    allowNull: false
  },
  castrado: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  vacinado: {
    type: Sequelize.BOOLEAN,
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

Ong.hasMany(Animal, {
  foreignKey: 'idOng'
});

Animal.belongsTo(Ong, {
  foreignKey: 'idOng'
});

Animal.sync();

export default Animal;