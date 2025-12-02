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
  imagem: {
    type: Sequelize.STRING(500),
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
  telefoneContato: {
    type: Sequelize.STRING(15),
    allowNull: false
  },
  cnpj: {
    type: Sequelize.CHAR(20),
    allowNull: false,
    unique: true
  },
  cep: {
    type: Sequelize.STRING(11)
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
  },
  descricao: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "Pendente" 
  }

});

//Ong.sync();

Ong.sync({ alter: true })
  .then(async () => {
    const dadosOngs = [
      {
        nomeOng: "Auqmia - Proteção Animal e Ambiental",
        imagem: "uploads/ong2.png",
        email: "contato.auqmia@gmail.com",              
        senha: "auqmia123",
        telefoneContato: "(11) 94728-5851",              
        cnpj: "21.035.105/0001-56",     
        cep: "02631-000",
        rua: "Rua Antônio de Sousa Lima",
        numero: "325",
        cidade: "São Paulo",
        uf: "SP",                 
        complemento: "Casa 3, próximo à Praça dos Bichos",
        bairro: "Vila Nova Cachoeirinha",
        descricao: "Somos um grupo de protetores independentes que resgatam animais em situação de abandono, realizam castração, vacinação, vermifugação e sociabilização para adoção. :contentReference[oaicite:3]{index=3}",
        status: "Aprovado"
      },

      {
        nomeOng: "Instituto Ampara Animal",
        imagem: "uploads/ong1.png",
        email: "voluntario@amparanimal.org.br",         
        senha: "ampara2024",
        telefoneContato: "(11) 99512-4438",
        cnpj: "12.345.678/0001-90",      
        cep: "05422-030",
        rua: "Rua dos Pinheiros",
        numero: "1123",
        cidade: "São Paulo",                                 
        uf: "SP",                                       
        complemento: "Conjunto 402, Ed. Vida Animal",
        bairro: "Pinheiros",
        descricao: "OSCIP sem fins lucrativos, que atua em educação, advocacy, castração, adoção de cães e gatos e apoio a protetores independentes. :contentReference[oaicite:6]{index=6}",
        status: "Aprovado"
      },

      {
        nomeOng: "Associação Patinhas Unidas de Parintins (APUP)",
        imagem: "uploads/ong33.png",
        email: "ongapup@outlook.com",             
        senha: "apup123",            
        telefoneContato: "(92) 94372-530",              
        cnpj: "24.954.603/0001-90",     
        cep: "69152-000",
        rua: "Rua São Jorge",
        numero: "15",
        cidade: "Parintins",                
        uf: "AM",
        complemento: "Casa amarela ao lado da Escola Municipal São Jorge",
        bairro: "Área Rural - Jacareacanga",            
        descricao: "Entidade sem fins lucrativos que resgata, cuida e promove adoção de animais vulneráveis no município de Parintins/AM. :contentReference[oaicite:12]{index=12}",
        status: "Aprovado"
      },

      {
        nomeOng: "Instituto Luisa Mell",
        imagem: "uploads/ong4.png",
        email: "contato@institutoluisamell.com",   
        senha: "luisamell@2024",
        telefoneContato: "(11) 99999-4567",
        cnpj: "22.333.444/0001-55",
        cep: "09400-000",
        rua: "Rua Mário Gonçalves de Oliveira",
        numero: "110",
        cidade: "Ribeirão Pires",
        uf: "SP",
        complemento: "Sede Instituto",
        bairro: "Centro",
        descricao: "Instituto que resgata e trata animais vítimas de maus-tratos, promovendo adoções e campanhas de castração gratuita.",
        status: "Aprovado"
      },

      {
        nomeOng: "Adote um Focinho",
        imagem: "uploads/ong5.png",
        email: "adoteumfocinho@outlook.com",
        senha: "focinho@2025",
        telefoneContato: "(11) 98765-4321",
        cnpj: "55.666.777/0001-88",
        cep: "04047-004",
        rua: "Rua Joaquim Nabuco",
        numero: "325",
        cidade: "São Paulo",
        uf: "SP",
        complemento: "Sala 4 - Vila Clementino",
        bairro: "Vila Clementino",
        descricao: "ONG paulistana que resgata animais em situação de rua e promove adoções responsáveis com acompanhamento pós-adoção.",
        status: "Aprovado"
      },

      {
        nomeOng: "S.O.S. Pet Santa Catarina",
        imagem: "uploads/ong6.png",
        email: "sosPetSC@outlook.com",
        senha: "sospetsc@2025",
        telefoneContato: "(47) 99988-7766",
        cnpj: "88.999.000/0001-11",
        cep: "88302-401",
        rua: "Rua Blumenau",
        numero: "950",
        cidade: "Itajaí",
        uf: "SC",
        complemento: "Sede administrativa",
        bairro: "Centro",
        descricao: "ONG catarinense dedicada ao resgate, castração e adoção de cães e gatos abandonados, com atuação destacada em Itajaí e região.",
        status: "Pendente"
      }
 
      
    ];

    for (const ongs of dadosOngs) {
      await Ong.findOrCreate({
        where: { email: ongs.email },
        defaults: { 
          nomeOng: ongs.nomeOng,
          imagem: ongs.imagem,
          senha: ongs.senha,
          telefoneContato: ongs.telefoneContato,
          cnpj: ongs.cnpj,
          cep: ongs.cep,
          rua: ongs.rua,
          numero: ongs.numero,
          cidade: ongs.cidade,
          uf: ongs.uf,
          complemento: ongs.complemento,
          bairro: ongs.bairro,
          descricao: ongs.descricao,
          status: ongs.status
        }
      });
    }
  })
  .catch(console.error);


export default Ong;
