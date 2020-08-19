const Booking = require('../models/Booking')

module.exports ={
    //criação de uma nova reserva
    async store(req, res){
        //buscar usuario logado dentro do cabelaçalho, usuario que está fazendo a reserva
        const { user_id } = req.headers;
        
        //buscar o id do spot criado dentro dos parametros que vem da rota
        const { spot_id } = req.params;

        //buscar a data que 
        const {date} = req.body

        //criação da reserva de fato
        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        //infos do usuario
        /*booking-> objeto criado em const
         * populate -> popular relacionamento
           ('spot') -> relacionamento que será populado
            populate -> popular relacionamento
           ('user') -> relacionamento que será populado
           .execPopulate -> para executar os popoulates criados e preencher os dados de usuario e spot
         */
        await booking.populate('spot').populate('user').execPopulate();

        
        return res.json(booking);
    }
};