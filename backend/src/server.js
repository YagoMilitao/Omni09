//require ('')mportar o express para a aplicação
//const express = express será uma constante
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
//express() -> É uma função
const app = express();
//path-> Lidar com caminhos na aplicação
const path = require('path');


//                              nomeuser  :senha    nomecluster.                   nomedb
mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack09.ilyvg.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


//para acessar o cors
app.use(cors());

//para ler os dados json
app.use(express.json());
//Para conseguir visualizar o arquivo upado
/*quando o usuario acessar a rota /files
                  , forma que o express utiliza para retornar arquivos estaticos como: PDF, IMAGEM, geralmente utilizado qndo tem upload na aplicação
                                 caminho para pasta onde estão os arquivos upados*/
app.use('/files', express.static(path.resolve(__dirname, '..','uploads')));

//precisa ser depois do use json
app.use(routes);

//app vai ouvir a porta 3333
app.listen(3333);