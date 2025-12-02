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
  imagem: {
    type: Sequelize.STRING(255),
    allowNull: true
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
  preferenciaTipo: {
    type: Sequelize.ENUM('Gato', 'Cachorro', 'Outros',),
    allowNull: true
  },
  preferenciaPorte: {
    type: Sequelize.ENUM('Pequeno', 'Médio', 'Grande'),
    allowNull: true
  },
  cep: {
    type: Sequelize.STRING(10)
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
    type: Sequelize.STRING(100),
    allowNull: true
  },
  bairro: {
    type: Sequelize.STRING(100)
  }

});

Cliente.sync({ alter: true })
  .then(async () => {

    const clientes = [
      {
        nome: "Lucas Andrade",
        imagem: null,
        cpf: "123.456.789-09",
        email: "lucas.andrade@example.com",
        senha: "senha123",
        cep: "01001-000",
        rua: "Praça da Sé",
        numero: "100",
        cidade: "São Paulo",
        uf: "SP",
        complemento: "",
        bairro: "Sé",
        preferenciaTipo: "Cachorro",
        preferenciaPorte: "Médio"
      },
      {
        nome: "Mariana Silva",
        imagem: null,
        cpf: "987.654.321-00",
        email: "mariana.silva@example.com",
        senha: "senha123",
        cep: "20040-010",
        rua: "Rua da Quitanda",
        numero: "45",
        cidade: "Rio de Janeiro",
        uf: "RJ",
        complemento: "Apto 302",
        bairro: "Centro",
        preferenciaTipo: "Gato",
        preferenciaPorte: "Pequeno"
      },
      {
        nome: "Fernando Oliveira",
        imagem: null,
        cpf: "111.444.777-35",
        email: "fernando.oliveira@example.com",
        senha: "senha123",
        cep: "30140-110",
        rua: "Av. Álvares Cabral",
        numero: "250",
        cidade: "Belo Horizonte",
        uf: "MG",
        complemento: "",
        bairro: "Santo Agostinho",
        preferenciaTipo: "Cachorro",
        preferenciaPorte: "Grande"
      },
      {
        nome: "Beatriz Santos",
        imagem: null,
        cpf: "222.333.444-05",
        email: "beatriz.santos@example.com",
        senha: "senha123",
        cep: "80010-000",
        rua: "Rua XV de Novembro",
        numero: "80",
        cidade: "Curitiba",
        uf: "PR",
        complemento: "",
        bairro: "Centro",
        preferenciaTipo: "Gato",
        preferenciaPorte: "Pequeno"
      },
      {
        nome: "Gabriel Costa",
        imagem: null,
        cpf: "555.666.777-58",
        email: "gabriel.costa@example.com",
        senha: "senha123",
        cep: "69005-070",
        rua: "Av. Eduardo Ribeiro",
        numero: "900",
        cidade: "Manaus",
        uf: "AM",
        complemento: "Sala 12",
        bairro: "Centro",
        preferenciaTipo: "Outros",
        preferenciaPorte: "Médio"
      },
      {
        nome: "Ana Lima",
        imagem: null,
        cpf: "012.345.678-90",
        email: "ana.lima@example.com",
        senha: "senha123",
        cep: "40020-000",
        rua: "Av. Sete de Setembro",
        numero: "150",
        cidade: "Salvador",
        uf: "BA",
        complemento: "",
        bairro: "Campo Grande",
        preferenciaTipo: "Gato",
        preferenciaPorte: "Pequeno"
      },
      {
        nome: "Ricardo Mendes",
        imagem: null,
        cpf: "321.654.987-01",
        email: "ricardo.mendes@example.com",
        senha: "senha123",
        cep: "60060-440",
        rua: "Rua Barão do Rio Branco",
        numero: "210",
        cidade: "Fortaleza",
        uf: "CE",
        complemento: "",
        bairro: "Centro",
        preferenciaTipo: "Cachorro",
        preferenciaPorte: "Grande"
      },
      {
        nome: "Julia Ferreira",
        imagem: null,
        cpf: "741.852.963-20",
        email: "julia.ferreira@example.com",
        senha: "senha123",
        cep: "66010-020",
        rua: "Rua Padre Prudêncio",
        numero: "33",
        cidade: "Belém",
        uf: "PA",
        complemento: "",
        bairro: "Campina",
        preferenciaTipo: "Gato",
        preferenciaPorte: "Pequeno"
      },
      {
        nome: "Thiago Rocha",
        imagem: null,
        cpf: "852.963.741-06",
        email: "thiago.rocha@example.com",
        senha: "senha123",
        cep: "70040-010",
        rua: "SBN Quadra 1",
        numero: "12",
        cidade: "Brasília",
        uf: "DF",
        complemento: "Bloco C",
        bairro: "Asa Norte",
        preferenciaTipo: "Cachorro",
        preferenciaPorte: "Médio"
      },
      {
        nome: "Carolina Ramos",
        imagem: null,
        cpf: "369.258.147-89",
        email: "carolina.ramos@example.com",
        senha: "senha123",
        cep: "88010-400",
        rua: "Rua Felipe Schmidt",
        numero: "900",
        cidade: "Florianópolis",
        uf: "SC",
        complemento: "",
        bairro: "Centro",
        preferenciaTipo: "Gato",
        preferenciaPorte: "Pequeno"
      }
    ];

    for (const cliente of clientes) {
      await Cliente.findOrCreate({
        where: { cpf: cliente.cpf },
        defaults: cliente
      });
    }

    console.log("✅ Clientes cadastrados com sucesso!");

  })
  .catch(console.error);


Cliente.sync();
// Cliente.sync({ alter: true});

export default Cliente;
