import Sequelize from 'sequelize';
import db from './db.js';
import Ong from './Ong.js';

await Ong.sync(); // garante que a tabela exista antes

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
    type: Sequelize.STRING(40),
    allowNull: false
  },
  tipo: {
    type: Sequelize.ENUM('Gato', 'Cachorro', 'Outros',),
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
  status: {
    type: Sequelize.ENUM('Disponível', 'Adotado'),
    allowNull: false
  },
  historia: {
    type: Sequelize.STRING(500),
    allowNull: true
  },
  dataAdocao: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: null
  },
  idOng: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'ongs', // usar string
      key: 'idOng'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
});

Ong.hasMany(Animal, {
  foreignKey: 'idOng'
});

Animal.belongsTo(Ong, {
  foreignKey: 'idOng'
});

// Criação e inserção automática dos dados
Animal.sync({ alter: true })
  .then(async () => {

    const dadosAnimais = [
      {
        nome: 'Luna',
        foto: 'imgs/animais/luna.png',
        raca: 'Vira-lata',
        sexo: 'Fêmea',
        idade: '2 anos',
        tipo: 'Cachorro',
        porte: 'Médio',
        castrado: true,
        vacinado: true,
        status: 'Disponível',
        historia: 'A Luna foi encontrada perto de uma praça, sempre abanando o rabinho para quem passava. É carinhosa e adora brincar com crianças.',
        idOng: 1,
      },

      {
        nome: 'Thor',
        foto: 'imgs/animais/thor.jpg',
        raca: 'Labrador',
        sexo: 'Macho',
        idade: '3 anos',
        tipo: 'Cachorro',
        porte: 'Grande',
        castrado: true,
        vacinado: true,
        status: 'Disponível',
        historia: 'O Thor foi resgatado após ser deixado para trás quando seus tutores se mudaram. Mesmo assim, continua amoroso e cheio de energia.',
        idOng: 2,
      },

      {
        nome: 'Mimi',
        foto: 'imgs/animais/mimi.png',
        raca: 'Siamês',
        sexo: 'Fêmea',
        idade: '1 anos',
        tipo: 'Gato',
        porte: 'Pequeno',
        castrado: true,
        vacinado: true,
        status: 'Disponível',
        historia: 'A Mimi foi encontrada escondida embaixo de um carro durante uma chuva forte. Hoje é carinhosa e gosta de cochilar no colo.',
        idOng: 3,
      },

      {
        nome: 'Max',
        foto: 'imgs/animais/max.png',
        raca: 'Border Collie',
        sexo: 'Macho',
        idade: '10 meses',
        tipo: 'Cachorro',
        porte: 'Médio',
        castrado: true,
        vacinado: true,
        status: 'Disponível',
        historia: 'O Max é cheio de energia! Foi deixado na ONG por uma família que não conseguia acompanhar seu ritmo. Ele ama correr e aprender truques.',
        idOng: 1,
      },

      {
        nome: 'Belinha',
        foto: 'imgs/animais/belinha.png',
        raca: 'Poodle',
        sexo: 'Fêmea',
        idade: '5 anos',
        tipo: 'Cachorro',
        porte: 'Pequeno',
        castrado: true,
        vacinado: true,
        status: 'Disponível',
        historia: 'A Belinha viveu com uma senhora idosa que infelizmente precisou ser internada. É dócil, calma e adora receber carinho.',
        idOng: 5,
      },

      {
        nome: 'Tobias',
        foto: 'imgs/animais/tobias.png',
        raca: 'Pastor Alemão',
        sexo: 'Macho',
        idade: '2 anos',
        tipo: 'Cachorro',
        porte: 'Grande',
        castrado: true,
        vacinado: true,
        status: 'Disponível',
        historia: 'O Tobias foi resgatado após se perder de seus antigos donos. Inteligente e protetor, ele gosta de estar sempre por perto.',
        idOng: 1,
      },

      {
        nome: 'Nina',
        foto: 'imgs/animais/nina.png',
        raca: 'Persa',
        sexo: 'Fêmea',
        idade: '3 meses',
        tipo: 'Gato',
        porte: 'Pequeno',
        castrado: true,
        vacinado: true,
        status: 'Disponível',
        historia: 'A pequena Nina foi encontrada em uma caixa com seus irmãos. Ela é curiosa, brincalhona e ronrona por qualquer carinho.',
        idOng: 2,
      },

      {
        nome: 'Simba',
        foto: 'imgs/animais/simba.png',
        raca: 'Maine Coon',
        sexo: 'Macho',
        idade: '2 anos',
        tipo: 'Gato',
        porte: 'Pequeno',
        castrado: true,
        vacinado: true,
        status: 'Disponível',
        historia: 'O Simba foi entregue à ONG depois que sua família precisou se mudar. Ele é tranquilo, adora observar a janela e se dá bem com outros gatos.',
        idOng: 1,
      }
    ];

    for (const animal of dadosAnimais) {
      await Animal.findOrCreate({
        where: { nome: animal.nome, foto: animal.foto, idOng: animal.idOng },
        defaults: animal
      });
    }

    console.log("✅ Dados de animais cadastrados com sucesso!");
  })
  .catch(console.error);

export default Animal;