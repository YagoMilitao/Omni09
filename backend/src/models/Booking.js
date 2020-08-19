//Booking = Reserva
//Armazenar as reservas 
//A reserva é feita por um usuario e é uma reserva para trabalhar dentro desse spot

//importação monngose para utilizar o mongo
const mongoose = require('mongoose');

//SpotSchema-> estrutura do usuário, os campos que vai ter, qual tipo de campos   
const BookingSchema = new mongoose.Schema({
    //campos da tabela booking
    date: String,
    approved: Boolean,
    //usuario que criou esse Booking
    user:{
        // o ObjectId -> é o id colocado automaticamente pelo BD
        type:mongoose.Schema.Types.ObjectId,
        //ref->referencia para qual model é essa informação, então essa informação de usuario está se referindo ao model User.js 
        ref: 'User'
    },
    //Spot em que se quer fazer a reserva(booking)
    spot:{
        // o ObjectId -> é o id colocado automaticamente pelo BD
        type:mongoose.Schema.Types.ObjectId,
        //ref->referencia para qual model é essa informação, então essa informação de usuario está se referindo ao model User.js 
        ref: 'Spot'
    }
});

//exporta                     nomeDaTabela,
module.exports = mongoose.model('Booking', BookingSchema);


