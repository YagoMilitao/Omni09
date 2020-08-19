import React, { useEffect, useState } from 'react';
//SpotList nã é uma pagina listada nas rotas, por isso nao possui propriedades do navigate
import { withNavigation } from  'react-navigation';
                                //Para criar lista
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import api from '../services/api';

//para navegar retiro o export default daqui e coloca no fim da página
 function SpotList({tech, navigation}){
    const [spots, setSpots] = useState([]);
    useEffect(() =>{
        async function loadSpots(){
            const response = await api.get('/spots',{
                //qual tecnologia que eu quero buscar
                // mesma coisa que /spots?tech=tecnologiaProcurada
                params: { tech } 
            })

            /*testando  se as tecnologias estão sendo buscadas corretamente
            console.log(response.data);*/
            
            //para preencher a listagem de spots
            setSpots(response.data);
        }
        loadSpots();
    }, []);
	
    //para saber em qual spot o usuario está clicando
    //                      id do spot que o usuario clicou
    function handleNavigate(id){
        navigation.navigate('Book',{id});
    }
    return (
            <View style={styles.container}>
                <Text style={styles.title}>Empresas que usam <Text style={styles.tecnology}>{tech}</Text></Text>

                {/*data={spots}-> array inde estão as informaçoes
                   keyExtractor={spot->funcão que recebe um funçaõ e essa função vai receber cada spot 
                             =>spot._id -> devolver qual informação dentro desse spot é unica
                    horizontal -> pq a lista será na horizontal( um item ao lado do outro)         
                    showsVerticalScrollIndicator={false} -> pq não é para mostrar a barra de rolagem quando o usuario está utilizando
                    renderItem =-> como ele deve se comportar para mostrar cada spot
                      {({item}) => - é o spot(pode receber info se é o 1º item da lista, se é o ultimo item da lista, se é um item par ou impar, saber o index)
                      ()->(Para retornar um HTML utiliza-se())como cada um do itens deve renderizar
                      <Image source={item.thumbnail_url -> não da para usar pq o source qndo utilizado nesse formato ele vai tentar buscar um arquivo fisico( que nao esta nesse projeto mobile)
                                    o certo é <Image source={{uri.item.thumbnail_url ->Onde estão as imagens}} }
                 */}
                <FlatList 
                    style={styles.list}
                    data={spots}
                    keyExtractor={spot => spot._id}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    renderItem ={({ item }) => (
                        <View style={styles.listItem}>
                            <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                            <Text style={styles.company}>{item.company}</Text>
                            {/*                       se tiver um preço   ` fazer isso     `      else colocar isso   */}
                            <Text style={styles.price}>{item.price ?      `R$${item.price}/dia`   :    'GRATUITO'}</Text>
                            <TouchableOpacity onPress={handleNavigate} style={styles.button}>
                                <Text style={styles.buttonText}>Solicitar reserva</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
          )
}

const styles = StyleSheet.create({
    container:{
        //para afastar de qualquer coisa que estiver acima eventualmente
        marginTop: 30,
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        //tudo que tiver abaixo dele vai distanciar 15 pixels
        marginBottom: 15,
    },

    tecnology: {
        fontWeight: 'bold'
    },

    ist: {
        paddingHorizontal: 20,
      },
    
      listItem: {
        marginRight: 15,
      },
    
      thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
      },
    
      company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
      },
    
      price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
      },
    
      button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
      },
    
      buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
      },
    });

    export default withNavigation(SpotList);