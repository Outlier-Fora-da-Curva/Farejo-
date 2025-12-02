import Sequelize from 'sequelize';
import db from './db.js';
import Ong from './Ong.js';

await Ong.sync(); // garante que a tabela exista antes

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

Evento.sync({ alter: true })
  .then(async () => {
    const dadosEventos = [
      {
        nomeEvento: "Multirão de Castração Gratuita",
        descricaoEvento: "O Instituto Ampara Animal promoverá um grande mutirão de castração gratuita para cães e gatos da comunidade. O evento contará com orientações veterinárias, doação de ração e feira de adoção.",
        imagemEvento: "imgs/eventos/multirao.png",
        dataEvento: new Date("2025-11-15T09:00:00"),
        localEvento: "Praça dos Pinheiros, São Paulo - SP",
        idOng: 2
      },
      {
        nomeEvento: "Feira de Adoção de Filhotes",
        descricaoEvento: "A ONG Auqmia realizará uma feira de adoção com mais de 30 cães e gatos resgatados. Todos os animais estão vacinados e castrados, prontos para ganhar um novo lar.",
        imagemEvento: "imgs/eventos/feira.png",
        dataEvento: new Date("2025-12-01T10:00:00"),
        localEvento: "Parque da Juventude, São Paulo - SP",
        idOng: 1
      },
      {
        nomeEvento: "Campanha Natal Animal Solidário",
        descricaoEvento: "Participe da campanha de arrecadação de ração e cobertores promovida pelo Instituto Luisa Mell. As doações ajudarão abrigos e protetores independentes neste final de ano.",
        imagemEvento: "imgs/eventos/natal.png",
        dataEvento: new Date("2025-12-20T09:30:00"),
        localEvento: "Sede Instituto Luisa Mell, Ribeirão Pires - SP",
        idOng: 4
      },
      {
        nomeEvento: "Corrida Pet 2025",
        descricaoEvento: "Evento esportivo beneficente promovido pela APUP em Parintins. A corrida contará com percurso de 5 km para tutores e cães, além de estandes com produtos pet e veterinários parceiros.",
        imagemEvento: "imgs/eventos/corrida.png",
        dataEvento: new Date("2025-11-30T07:00:00"),
        localEvento: "Praça São Jorge, Parintins - AM",
        idOng: 3
      }
    ];

    for (const evento of dadosEventos) {
      await Evento.findOrCreate({
        where: { nomeEvento: evento.nomeEvento },
        defaults: evento
      });
    }

    console.log("✅ Eventos cadastrados com sucesso!");
  })
  .catch(console.error);
  
export default Evento;
