const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/bd');
const Usuario = require('./models/usuario');
const home = require('./routes/home');


const app = express();
app.use(express.json());


//Handlebars
app.engine('handlebars', exphbs.engine({defaultLayout: false}));
app.set('view engine', 'handlebars');

app.use('/', home);

 //-----------------------------BD CONEXÃO--------------------------------

async function conectarBD() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    
    app.listen(3000, () => {
      console.log("Servidor rodando em http://localhost:3000");
    });
  } catch (erro) {
    console.error('Erro ao conectar:', erro);
  }
}

conectarBD();

