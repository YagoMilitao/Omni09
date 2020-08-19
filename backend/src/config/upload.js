//multer para importar multpart
const multer = require('multer');

const path = require('path');

module.exports = {
    //storage ->como o multer vai armazenar as imagens ou arquivos que será recebido da aplicação
    //multer.disktorage -> vai salvar no disco
    storage: multer.diskStorage({
        //destination:-> qual pasta que o arquivo será salvo
        /*path.resolve -> para informar qual a pasta qual a pasta que vai gravar os arquivos
         utiliza-se path.resolve pq o Windows não entende /, a pasta do windows é ao contrario \. 
         com o path resolve ao invés de / coloca-se virgula aí coloca a barra correta de acordo com o SO*/
        //__dirname -> informa qual o diretorio atual, para garantir que chegue no local certo
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
         //filename -> nome do arquivo
         /*req -> a requisição
           file-> arquivo em si, da pra pegar infos como: tipo do arquivo, extensão, tamanho, nome do arquivo
           cb  -> callback, é uma função que deve ser chamada assim que o nome do arquivo estiver pronto
         */
        filename: (req, file, cb) => {
            //(1º parametro, poderia ser um erro) 
            /*,``para formar o nome do arquivo, pela junção de varias variaveis
              fieldname->nome do arquivo que veio do cliente
              Date.now ->retornar o timestamp da data atual
              path.extname ->retorna a extensão 
              file.originalname ->nome completo da imagem */
            
              //Colocar o nome real do arquivo que foi upado
              //para gerar a extensão
              const ext = path.extname(file.originalname);
              //para gerar o nome: basename-> retorna o nome de uma imagem se uma extensão, ext-> para remover a extensão
              const name = path.basename(file.originalname, ext);


              cb(null, `${name}-${Date.now()}${ext}`);
         }
    }),
};