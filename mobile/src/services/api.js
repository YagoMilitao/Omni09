//importando o axios para conversar com o back
import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://localhost:3333' -> só funciona com o mesmo endereço da porta do back se estiver usando um mack com o emulador de iphone, não funciona no dispositivo fisico
    //        endereço do localhost qndo starta a aplicação e o dispositivo fisico precisa estar na mesma rede para funcionar
    baseURL: 'http://192.168.0.5:3333',
});
//exportando api.js
export default api;