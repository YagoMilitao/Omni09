//importação monngose para utilizar o mongo
const mongoose = require('mongoose');

//UserSchema-> estrutura do usuário, os campos que vai ter, qual tipo de campos   
const UserSchema = new mongoose.Schema({
    email: String,
})  

//exporta                     nomeDaTabela,
module.exports = mongoose.model('User', UserSchema);