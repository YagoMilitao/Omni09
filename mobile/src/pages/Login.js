//State-> INformação mantida pelo componente, toda vez que tiver algum tipo de info que será manipulada pelo meu componente significa que vou ter um State
import React, {useState, useEffect} from 'react';
                                                                        //importar imagem para a aplicação
                                                                                      //importar caixa de texto  
                                                                                                 //botão dentro RN que todoa vez que ele é clicado ele diminui um pouco a opacidade                         
                              //Para o teclado não ficar em cima do conteudo da tela
                                                  //para ter acesso a plataforma em que a apliação está rodando
               //Tipo um LocalStorage
import { View, AsyncStorage, KeyboardAvoidingView, Platform, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';


export default function Login({ navigation }) {
    const [email, setEmail]= useState('');
    const [techs, setTechs]= useState('');
    
    useEffect(() =>{
        //ver o usuario está logado na aplicação(se isso existir significa que o usuario está logado na aplicação)
        //se o usuario foi encontrado o valor sera colocado dentro da variavel user ex: .then(usuarioencontrado)
        AsyncStorage.getItem('user').then(user =>{
            if (user){
                navigation.navigate('List');
            }
        })
    }, []);

    //será disparada quando o usuario enviar o form
    async function handleSubmit(){
        /*testando para ver se aparece na tela de log do localhost 
        console.log(email, techs);*/

        //chamando a api para logar na aplicação
        /*igual fez no reactJS
                               api.post() -> pq nossa rota de sessão na API o método é POST
                                       '/sessions -> rota na API       
        ->precisa receber o email no corpo*/
        const response = await api.post('/sessions', {
            email
        })

        //se tudo deu certo, vou conseguir recuperar o id do usuario logado na aplicação
        //           = dentro do response.data;
        const { _id } = response.data;
        /*testando para ver se ta chegando o id do usuario que logamos na aplicaçao
        console.log(_id);*/

        //                      ('nome da info que quer salvar'
        //                                valor
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        //mandar usuario para outra página
        //.navigate-> função para navegar o usuario
        //                   -> tela que eu quero mandar o usuario
        navigation.navigate('List');
    }
    
    //enabled={Platform.OS === 'ios'}-> só quero que isso estja habilitado se o SO da plataforma da aplicação seja ios
    //behavior="padding"-> qndo o teclado abrir ele vai dar um padding(espaçamento interno) em baixo do tamanho do teclado só utiliza no IOS, no android vem por defualt
    return <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
        <Image source={logo} /> 

        {/*Não existe form então maquiar o form dentro de uma view */}   
        <View style={styles.form}>
            <Text style={styles.label}>SEU EMAIL *</Text>
            {/*keyboardType="email-address" -> teclado para email(aquele que já vem com @) */}
            {/*autoCapitalize = "none"-> tirar o Caps da primeira letra */}
            {/*autoCorrect={false} -> não tem auto correção na hora de escrever o email */}
            {/* != da versão web, aqui nao recebe o evento e sim o texto diretamente
                onChangeText={ text => setEmail(text)} === onChangeText={ setEmail} 
                 -> como eu só estou recebendo o parametro e passamento como parametro para outra função, eu posso só passar a função como referencia (só funciona no RN)
            */}
            <TextInput
                style={styles.input}
                placeholder="Seu e-mail"
                placeholderTextColor ="#999"
                keyboardType="email-address"
                autoCapitalize = "none"
                autoCorrect={false}

                value={email}
                onChangeText={setEmail}

            />

            <Text style={styles.label}>TECNOLOGIAS *</Text>
            {/*autoCapitalize = "words"-> primeira letra de cada palavra com caps */}
            {/*autoCorrect={false} -> Retirando a atuo correção do teclado do celular */}
            <TextInput
                style={styles.input}
                placeholder="Tecnologias de interesse"
                placeholderTextColor ="#999"
                autoCapitalize = "words"
                autoCorrect={false}

                value={techs}
                onChangeText={setTechs}
            />
            {/*qndo o usuario clicar no botão chamar a fumção handleSubmit */}
            {/*onPress={handleSubmit} função do RN == onClick */}
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Encontrar Spots</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
}


const styles = StyleSheet.create({
    container:{
       //para o cupar todo o tamanho da tela
       flex: 1,
       //para alinhar o conteudo da tela verticalmente ao centro
        justifyContent: 'center',
       //para alinhar o conteudo da tela horizontalmente ao centro
       alignItems: 'center'
    },
    form: {
        //para aocupar a largura inteira possivel
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
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

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },


})