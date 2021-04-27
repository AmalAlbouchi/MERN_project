import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Ajouter from './pages/Ajouter'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Calendrier from './pages/Calendrier/'
import TopNav from './components/TopNav'

export default function Routes() {
    return (
        <BrowserRouter>
        
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/calendrier' exact component={Calendrier} />
                <Route path='/Ajouter' component={Ajouter} />
                <Route path='/Register' component={Register} />
                <Route path='/Login' component={Login} />
            </Switch>
        </BrowserRouter>
    );
}