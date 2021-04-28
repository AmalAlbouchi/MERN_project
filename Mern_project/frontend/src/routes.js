import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Ajouter from './pages/Ajouter'
import Home from './pages/Home'
import Calendrier from './pages/Calendrier/'
import EditConsultation from './pages/EditConsultation/'
import Register from './pages/Register'
import Login from './pages/Login'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/calendrier' exact component={Calendrier} />
                <Route path='/Ajouter' component={Ajouter} />
                <Route path='/EditConsultation/:id' component={EditConsultation} />
                <Route path='/EditConsultation/' component={EditConsultation} />
                <Route path='/Register' component={Register} />
                <Route path='/Login' component={Login} />
            </Switch>
        </BrowserRouter>
    );
}