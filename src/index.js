import React from 'react';

//
import ReactDOM from 'react-dom';

//Middleware responsável para fazer com que os componentes consiga visualizar a store através do connect
import { Provider } from 'react-redux'; 

//Dois middleware para configurar o redux e criar a Store 
import { applyMiddleware, createStore } from 'redux'; 

// O promise se receber uma promessa, enviará o valor resolvido da promessa. Não enviará nada se a promessa rejeitar.
import promise from 'redux-promise';

// Isso enviará as duas Actions(dispatchToProps, StateToProps) em ordem, embora não em série no sentido assíncrono
import multi from 'redux-multi';

// O middleware Redux Thunk permite escrever criadores de ação (ActionCreators) que retornam uma função em vez de uma ação. 
import thunk from 'redux-thunk';

// import do auth ou app a idéia é se existir login e já renderiza para a aplicação, agora se não tiver e renderizar a pagina de login.
import AuthOrApp from './main/AuthOrApp';

//Importação do componente de Toast
import Toastr from './components/messages/toastr';

// Apresenta os estados de todos os componentes criados dentro da loja
import reducers  from './reducers';

// 
import * as serviceWorker from './serviceWorker';

/**
 * Constante resposável para que a gente consiga visualizar todo o comportamento do redux atrás da extensão do navegador 
 * (Redux devTools) https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related
 */
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__();

/**
 * store: estado unico da aplicação
 * applyMiddleware, aplica os middlewares necessários para a aplicação
 * createStore: cria a store
 * reducers: aplica e configura os reducers da aplicação para a store
 */
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools);


ReactDOM.render(<Provider store={store}> <AuthOrApp /> <Toastr/> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();