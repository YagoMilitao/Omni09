//importação monngose para utilizar o mongo
const mongoose = require('mongoose');

//SpotSchema-> estrutura do usuário, os campos que vai ter, qual tipo de campos   
const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    //usuario que criou esse spot
    user:{
        // o ObjectId -> é o id colocado automaticamente pelo BD
        type:mongoose.Schema.Types.ObjectId,
        //ref->referencia para qual model é essa informação, então essa informação de usuario está se referindo ao model User.js 
        ref: 'User'
    }
}, {
    //toda vez que um Spot for convertido em JSON, calcular os virtuals automaticamente, ou seja, colocar os virtuals junto
    toJSON: {
        virtuals:true,
    },

});

/*Toda vez que o Spot for utilizado em alguma listagem, ele retorna todos os campos, com esse novo campo criado será possivel pegar a imagem que esta sendo passada
criar um campo que não existe no mongon ,ñ existe no SpotSchema mas existe no JS
para fazer isso utiliza-se o virtua*/
SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/files/${this.thumbnail}`
})

//exporta                     nomeDaTabela,
module.exports = mongoose.model('Spot', SpotSchema);