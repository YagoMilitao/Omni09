import React from 'react';

import './App.css';

//importando a logo AIRCNC
import logo from './assets/logo.svg';

//importando as rotas
import Routes from './routes';

function App() {
   
  return (
    <div className= "container">
      {/*para incluir código Js dentro do HTML colocar entre chaves{} */}
      {/*incluir logo AirCnC */}  
      <img src={logo} alt="AirCnC" />

      {/*Bloco Branco */}
      <div className= "content">
        {/*Rotas estarão aqui */}
        <Routes />
        
      </div>
    </div>
  );
}

export default App;
