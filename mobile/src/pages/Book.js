/*Página para fazer uma reserva */
import React, {useState} from 'react';
//                                                                                        Enviar Alerta
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, AsyncStorage, Alert }  from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
const [date, setDate] = useState('');

    //                           nome do atributo que quero recuperar
    const id= navigation.getParam('id');

    async function handleSubmit(){
        //preciso do id do usuario logado
        const user_id = await AsyncStorage.getItem('user');

        //                     idDoSpot
        //rota para criar booking (mesma coisa insomnia)
        await api.post(`/spots/${id}/bookings`,{
            //enviar a data
            date
        },{
            //id do usuario logado dentro do cabeçalho(insomnia)
            headers: { user_id }
        })

        //Alerta de solicitação na tela
        Alert.alert('Solicitação de reserva enviada.');

        //Voltar para a tela de lista de spots
        navigation.navigate('List');

    }

    function handleCancel(){
        navigation.navigate('List');
    }
    return( 
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar ?"
                placeholderTextColor ="#999"
                autoCapitalize = "words"
                autoCorrect={false}

                value={date}
                onChangeText={setDate}

            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        margin: 30,
        
    },

label:{
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginTop: 30
},

input: {
    //largura da borda
    borderWidth: 1,
    //cor da borda
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
},

button:{
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    //para alinhar o texto no total centro do botão
    alignItems: 'center',
    borderRadius: 2,
},

cancelButton:{

    backgroundColor: '#ccc',
    marginTop: 10
},

buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
},
})