import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Spot from './pages/Spot';

export default function Routes(){
    return (
        <BrowserRouter>
        {/*Switc serve para garantir que apenas uma rota seja executada por vez, então duas rotas não serão exibidas ao mesmo tempo */}
        <Switch>
        {/*path-> caminho que usuario vai acessar na url
           exact-> se não só vai chamar a rota "/" para todos os caminhos digitados na barra de endereço */}
           <Route path="/" exact component={Login} />
           <Route path="/dashboard" component={Dashboard} />
           <Route path="/spot" component={Spot} />
        </Switch>
        </BrowserRouter>
    )
}