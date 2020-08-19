//Vai retornar todos os spots Criados ppr um usuario
const Spot = require('../models/Spot');

module.exports= {
    //show pq estou exibindo o DashboardController e não uma contagem de Dashboards em si
    async show(req,res) {
     
     //listagem dos spots do usuário logado
     //informar id do usuario logado
     //falar qual é o usuario logado para retornar os spots dele
     const {user_id} = req.headers;

     //todos os spots
                                //  campo user: compara com user_id
    //buscando todos os spots que o campo user la no BD é = ao user_id que esta vindo do req.headers
    const spots = await Spot.find({ user: user_id });

     //retorna um json com todos os spots
     return res.json(spots);
    }
}