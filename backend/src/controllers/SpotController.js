const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    //Listar spots
    async index(req,res){
        //filtrar tecnologias
        //buscar tech dentro de req.query
        const {tech} = req.query;
        //listar sposts dessa tecnlogia
        const spots = await Spot.find({techs:tech});

        return res.json(spots);
    },



    //Criação de um novo Spot (Lugar para programar)
    async store(req, res){
        //importar informação filename (nome original do arquivo)
        const {filename} = req.file;

        //importar company, techs e price de dentro do body
        const {company, techs, price} = req.body;

        //saber qual usuario esta criando este spot
        //header serve para enviar contexto da aplicação, utilizado para autenticação, idioma do ususario. Sempre utilizado para autenticação
        const { user_id } = req.headers;

        //verificar se o usuario existe
        const user = await User.findById(user_id);

        //Se o usuario não existe
        if(!user){
            return res.status(400).json({error: 'User does not exist'});
        }
        
        
        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            /*techs ta vindo como String separado por virgula, mas no BD espera ele como um array
              techs.split-> cortar a String em vários pedaços 
              (',')-> esses pedaços separados por vírgula
              //podem ter espaços em branco entre cada uma das techs
              .map-> percorrer este array
              (tech=> ->  para cada uma das tecnologias
              tech.trim()) ->  trim tira o espaço antes e depois de uma String
            */
           techs: techs.split(',').map(tech => tech.trim()),
           price
       });
       return res.json(spot);
   }
};