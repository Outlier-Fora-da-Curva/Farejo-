import Sequelize from 'sequelize';
import db from './db.js';
import Ong from './Ong.js';

await Ong.sync(); // garante que a tabela exista antes

const Publicacao = db.define("publicacoes", {
  idPublicacao: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  img: {
    type: Sequelize.TEXT,
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

Publicacao.sync({ alter: true })
  .then(async () => {
    const publicacoes = [
      {
        img: "/imgs/pub1.png",
        titulo: "Campanha de Adoção de Filhotes",
        numSalvos: 2,
        descricao: "A Auqmia resgatou recentemente uma ninhada de filhotes que precisam urgentemente de um lar amoroso! Todos os pequenos estão saudáveis, vacinados e prontos para adoção responsável. Venha participar do nosso evento no próximo sábado, das 10h às 16h, e leve para casa um novo melhor amigo. 💛 Cada adoção muda duas vidas: a do animal e a sua!",
        nomeOng: "Auqmia - Proteção Animal e Ambiental",
        fotoPerfilOng: "uploads/ong2.png",
        idOng: 1
      },
      {
        //img: JSON.stringify(["/imgs/landingPage/multirao.png", "/imgs/landingPage/feira.png"]),
        img: "/imgs/pub2.png",
        titulo: "Mutirão de Castração Gratuita",
        numSalvos: 3,
        descricao: "O Instituto Ampara Animal realizará um grande mutirão de castração gratuita para cães e gatos da comunidade. O evento acontecerá no Parque Villa-Lobos, em São Paulo, com atendimento por ordem de chegada. Além da castração, haverá orientações sobre cuidados pós-operatórios e vacinação. Garanta sua vaga e ajude a controlar a população de animais abandonados!",
        nomeOng: "Instituto Ampara Animal",
        fotoPerfilOng: "uploads/ong4.png",
        idOng: 2
      },
      {
        img: "/imgs/pub3.png",
        titulo: "Doação de Ração e Suprimentos",
        numSalvos: 1,
        descricao: "A Associação Patinhas Unidas de Parintins (APUP) está arrecadando doações de ração, medicamentos e produtos de higiene para animais em situação de vulnerabilidade. As doações podem ser entregues na sede da ONG ou em pontos parceiros da cidade. Cada contribuição ajuda a alimentar e cuidar de dezenas de cães e gatos resgatados das ruas. Participe e faça a diferença!",
        nomeOng: "Associação Patinhas Unidas de Parintins (APUP)",
        fotoPerfilOng: "uploads/ong6.png",
        idOng: 3
      }
    ];

    for (const pub of publicacoes) {
      await Publicacao.findOrCreate({
        where: { titulo: pub.titulo, idOng: pub.idOng },
        defaults: pub
      });
    }
  })
  .catch(console.error);

export default Publicacao;