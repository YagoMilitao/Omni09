//createSwitchNavigator-> qndo o usuario for de uma tela para outra, a anterior "deixa de existir", assim ele não pode voltar para a tela anterior != createStackNavigator que é navagação em pilha
import {createAppContainer, createSwitchNavigator} from 'react-navigation';


//paginas de rotas
import Login from './pages/Login';
import Book from './pages/Book';
import List from './pages/List';

//createAppContainer-> instrução do reactNative, ele precisa ficar por volta de todas as rotas 
const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book
    })
);

export default Routes;