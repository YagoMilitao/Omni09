  //{useState}->criacao de estados dentro da aplicação
import React, {useState} from 'react'
import api from '../../services/api';

export default function Login({ history }){
    /*[email-> vai retornar o valor desse estado de email em tempo real, ou seja, sempre que esse valor for alterado essa variavel vai atualizar
       setEmail-> serve para atualzar o valor de email] 
       useState-> retorna um vetor, um vetor com 2 posições, por isso tem um vetor depois de const pq é aplicada a desestruturação desse vetor, ele quer pegar os dois valores que eessa função retorna. esses valores são email e setEmail
       ('')-> valor que inicia o input geralmente é o vazio*/
  const [email, setEmail] = useState('');
  async function handleSubmit(event){
   
   /* (passar o event como parametro para a funcao)
    (e depois usar)para a não enviar para outra pagina depois de clicar em submit 
    event -> parametro para a funcao
    preventDefault->esta dizendo para a função (hadleSubmit no caso) previna seu funcionamento padrão, Não quero que 
    faça seu funcionamento padrão, que no caso é enviar o usuario para outra pagina*/
    event.preventDefault();
    /*Testando para ver se funciona 
    console.log('Hello World');*/
    /*Testando o email qndo der o submit do form 
    console.log(email);*/

    //chamar API
    //qndo chegar na linha abaixo, ele vai aguardar a finalização, da chamada a API, e qndo devolver uma resposta ele vai armazenar essa resposta dentro de response
    const response = await api.post('/sessions', {email})
    /*ver se as informações estão chegando corretamente na página
    console.log(response);*/
   
    //pegar o id do usuario que colocou o email
    const{ _id } = response.data;
    /*Teste para ver se o ID aparece
    console.log(_id);*/

    //armazenar id do usuário
    /*localStorage-> BD do navegador
     * .setItem -> Não sei, mas acho q o nome é sugestivo    
     * ('user')->nome da variavel
        _id -> parametro que eu quero pegar
        (para achar na pagina vai em inspecionar, aba application, local storage, http://localhost:300, coluna key=>user|email=>id do usuario)
     */
    localStorage.setItem('user', _id);

    /*hitory->utilizado para fazer navegação
                 ('/rota que desejo enviar(depois de apertar o botão no caso nessa função)*/
    history.push('/dashboard');
  }
  return  (
    <>
      {/*Texto */}
      <p>{/*     <negrito> */}
        Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
        </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor ="email">E-MAIL *</label>
        <input type="email" 
                id="email" 
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={event =>setEmail(event.target.value)}
        />
        <button className="btn" type="submit">Entrar</button>
      </form>
    </>
  )          
}
  

