//importar o model de usuario
const User = require('../models/User');

//index, show, store, update, destroy
/* Métodos padrão
index   -> método que vai retornar listagem de sessões
show    -> método listar uma única sessão
store   -> método para criar uma sessão
update  -> método para alterar uma sessão
destroy -> método remover/deletar uma sessão  
 */

module.exports ={
    //criar usuario
    //sempre que usar await, a função precisar ser async
    async store(req, res){
        //req.body para pegar o email pq ele que vem o corpo da requisição e dentro do corpo tem o email
        //const email = req.body.email
        // ↓ usando a desestruturação
        const { email } = req.body;
        
        //Se encontrar um usuario com aquele email, este email será salvo na variavel user
        //let é pq != de constante, ou seja, user pode mudar
        //findOne -> buscar pelo id do email no caso
        //({email: email}) mas a variavel tem o mesmo nome da chave por isso utiliza só ({email})
        let user = await User.findOne({ email });

        //Caso não encontre um usuario, aí sim cria um usuário
        if(!user){
            //criando usuario de fato
            /*o await é utilizado pois dependendo do que for fazer no BD demora um pouco, o await aguarda alguma instrução ser executada
            * o aeait só vai deixar prosseguir para a proxima linha quando a instrução após o await finalizar
            no caso seria User.create, ou seja, qndo o cadastro finalizar no BD*/ 
            //                            ({infos necessarias para criar o usuario})
            user = await User.create({ email });
            
        }
        
        return res.json(user);
    }
};