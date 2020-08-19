/*Pagina para Listar os spots */
//State -> para armazenar as tecnologias vindo do login.js
import React , { useState, useEffect } from 'react';
         //sempre que for mostrar algum texto em tela, importar Text
               //Para começar a utilizar a aplicação abaixo da "barra" de bateria,wifia e do relogio
                                                             //Barra de scroll vertical
import { Text, SafeAreaView, AsyncStorage, Image, StyleSheet, ScrollView } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';


export default function List( navigation) {
    const [techs, setTechs]= useState([]);
    /*Assim que esse component for exibido em tela, a variavel techs(declarada acima), estará preenchida com as tecnologias que o usuario preencheu
     na página anterior(Página de Login)*/
    useEffect(()=> {
        AsyncStorage.getItem('techs').then(storagedTechs =>{
            //informacao das tecs esta vindo como array
                                             //cortar onde tiver ','
                                                      //retirar espaços em branco
            const techsArray = storagedTechs.split(','). map(tech => tech.trim());

            setTechs(techsArray);
        })
    },[]);
    return (
         <SafeAreaView style={styles.container}>
                <Image style={styles.logo} source={logo} />
               <ScrollView>
                {/*percorrer o array de techs */}
                {techs.map(tech =>
                    //para cada uma dessas tecnologias colocar um spotlist
                    // sempre que usar map, utilizar key
                    <SpotList key={tech} tech={tech} />
                )}
               </ScrollView>
           </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        //para alinhar a imagem ao centro
        alignSelf: 'center',
        /*pq quando define altura para imagem ela corta e o reziseMode redefine o tamanho da img 
          contain-> o conteúdo da imagem, fica contido dentro do espaço que disponivel*/
        resizeMode: "contain",
        //para distanciar do topo
        marginTop: 10,

    },
});