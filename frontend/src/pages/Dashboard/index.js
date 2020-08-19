//           garregar uma informação assim que a pagina carrega 
//                      por ter essa info dos spots que vai precisar ser manipulada pelo componente, armazenar a listagem desses spots dentro de um state*/}
import React,{useEffect,useState} from 'react';

//       Link -> serve para criar Link. O usuario clica e ele vai para outra rota. Para nao precisar utilizar history.push toda vez
import { Link } from 'react-router-dom';
import api from '../../services/api';

//CSS da página
import './styles.css';
export default function Dashboard(){

         /*nome do estado
               , função apara atualizar o estado 
                             useState
                                     ([valor recomendaddo para iniciar é por meio da lista vazia pq vem do back como lista])*/
    const[spots, setSpots] = useState([]);
    /*recebe dois parametros, o 1º é uma função que esta escrito no formato de arrow function {}
                              o 2º é um array de dependencias, toda vez que o que tiver [aqui] alterar ele executa o que estiver na função
                                    anterior novamente; utiliza-se em filtros. Mas nessa aplicação nao vai usar. Toda vez que passa vazio para o
                                    useEffect, signifca que a função anterior será carregada uma unica vez*/
    useEffect(() => {
        //useEffect não pode ser async
        async function loadSpots(){
            /*no back quando chama a rota dashboard é preciso passar qual é o id do usuario logado, para retornar os spots somente daquele usuario
              primeiro busca o id do usuario */
              //foi como foi salvo dentro do localStorage 
            const user_id = localStorage.getItem('user');
            //{ objeto de configurações}
            const response = await api.get('/dashboard', {
                headers: {user_id}
            });
            /*testar se aparece os spots criados pelo usuario
            console.log(response.data);*/
            
            //mostrar na tela
            setSpots(response.data);
        }

        loadSpots();
    },[]);
    return  (
        <>
            {/*listar os spots criados */}
            <ul className="spot-list">
                {/*percorrer o array da resposta obtida da API e mostrar todos os spots
                por ter essa info que vai precisar ser manipulada pelo componente, armazenar a listagem desses spots dentro de um state*/}
                {/*percorrer a minha lista utilizando o .map 
                          para cada um destes spots retornar um html */}
                {spots.map(spot => (
                    /*key-> sempre que é feito uma estrutura de repetição como o .map é preciso usar o key dentro do primeiro elemento que vem logo após o map *informando uma informação dentro desse spot(no caso) que é unica *  e a informação unica que tem do spot é o _id*/
                    <li key ={spot._id}>
                        {/*imagem do spot, não é img pq é mais facil de manipular */}
                        {/*1ª {indica: quero escrever um código JS}{2ª indica que estou colocando um objeto} */}
                        {/*                              endereço tirado do backend que se refere onde está a imagem upada*/}
                        <header style={{backgroundImage: `url(${spot.thumbnail_url})`}}/>
                        {/*titulo do spot 
                                 {representação do spot cadastrado no back .(nome do campo no back)}*/}
                        <strong>{spot.company}</strong>
                        {/*        .price-> nome do campo de preço no back */}
                        {/*As vezes o price pode vir vazio*/}
                        {/*  ifspot.price ↓than                   ↓else */}
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO' }</span>
                    </li>
                ))}
            </ul>
            {/* to-> para onde eu quero enviar o usuario  */}
            <Link to="/spot">
               <button className="btn">Cadastrar novo Spot</button> 
            </Link>
        </>
    )  
}

