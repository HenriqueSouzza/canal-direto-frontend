import { combineReducers } from 'redux';

// import { reducer as formReducer } from 'redux-form'; //redux-form

import { reducer as toastrReducer } from 'react-redux-toastr'; //redux do componente de mensagens

//Auth
import AuthReducer from './pages/auth/reducer';

//Atividades complementares
import AtvAlunosReducer from './pages/atividadesComplementares/alunos/reducer';
import AtvAtividadesAtivasReducer from './pages/atividadesComplementares/atividades-ativas/reducer';
import AtvAtividadesReducer from './pages/atividadesComplementares/atividades/reducer';
import AtvGrupoAtividadesReducer from './pages/atividadesComplementares/grupo-atividades/reducer';
import AtvSubAtividadesReducer from './pages/atividadesComplementares/sub-atividades/reducer';

const rootReducer = combineReducers({
    dashboard: () => ({ test: 1500 }),
    toastr: toastrReducer,
    /*** Auth ***/
    auth: AuthReducer,
    /*** Atividades complementares ***/
    atvAlunos: AtvAlunosReducer,
    atvAtividadesAtivas: AtvAtividadesAtivasReducer,
    atvAtividades: AtvAtividadesReducer,
    atvGrupoAtividades: AtvGrupoAtividadesReducer,
    AtvSubAtividades: AtvSubAtividadesReducer,
})

export default rootReducer; 