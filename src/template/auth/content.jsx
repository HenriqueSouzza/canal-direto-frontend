import React from 'react';

import { Route, Switch  } from 'react-router-dom';

import Auth from '../../pages/auth/router';

import PaginaNaoEncontrada from '../../pages/auth/paginaNaoEncontrada';

import './style.css';


function Content(){

    return(
        <Switch>
            <Route exact path='/' component={Auth} />
            <Route path='/cadastro' component={Auth} />
            <Route path='/esqueci-senha' component={Auth} />
            <Route path="*" component={Auth}/>
        </Switch>
    )
}

export default Content;