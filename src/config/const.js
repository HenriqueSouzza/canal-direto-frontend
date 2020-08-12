
export const BASE_API = (
    process.env.NODE_ENV === 'production' ? 
        'http://sistemas-academicos-api.desenv.br/'
    :
    process.env.NODE_ENV === 'homologation' ?
        'http://sistemas-academicos-api.desenv.br/'
    :
        'http://sistemas-academicos-api.desenv.br/'
);

export const USER_LOGGED = 'henrique.souza'

export const TOKEN = (sessionStorage.getItem('token'))