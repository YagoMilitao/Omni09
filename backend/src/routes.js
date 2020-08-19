const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

//pegando o roteador do express, o cara responsavel pelas rotas do express e separando ele dentro de uma vareavel routes
const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
/*                   upload.single pq é uma unica imagem se fossem mais seria
                     se fosse várias seria upload.array()
*/
//                                 ('nome do campo que vai ter a minha imagem')
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);
//pegar id do spot
/*qndo vou fazer uma reserva eu sempre tenho que fazer a reserva em um Spot, impossivel fazer reserva sem um spot então
qndo a rota for criada, a rota será encadeada, uma rota nested
                           /usuario querendo criar uma reserva',


            ('/dentro desse spot
                    :/com esse id 
*/
routes.post('/spots/:spot_id/bookings', BookingController.store);


//exportando as rotas de dentro de routes.js
module.exports = routes;