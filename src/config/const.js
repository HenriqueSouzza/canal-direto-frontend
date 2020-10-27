
export const BASE_API = (
    process.env.NODE_ENV === 'production' ? 
        'https://desenv-apl.iesb.br/sistemas-academicos-api/'
    :
    process.env.NODE_ENV === 'development' ?
        'http://sistemas-academicos.desenv.br/sistemas-academicos-api/public/'
    :
        'http://sistemas-academicos.desenv.br/sistemas-academicos-api/public/'
);