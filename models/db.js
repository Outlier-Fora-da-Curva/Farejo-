import Sequelize from 'sequelize';

const conn = new Sequelize("farejo", "root", "", {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});

conn.authenticate()
    .then(() => {
        console.log("✅ Conectado ao banco de dados com sucesso!");
    })
    .catch(err => {
        console.log("❌ Erro ao conectar no banco de dados:");
        console.log(err);
    });

export default conn;
