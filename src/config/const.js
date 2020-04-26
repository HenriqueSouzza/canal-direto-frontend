
export const BASE_API = (
    process.env.NODE_ENV === 'production' ? 
        'http://inscricoes.unidos.br/api'
    :
    process.env.NODE_ENV === 'homologation' ?
        'http://inscricoes.unidos.br/api'
    :
        'http://inscricoes.unidos.br/api'

);