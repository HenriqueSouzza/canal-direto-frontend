
export const BASE_API = (

    process.env.NODE_ENV === 'production' ? 
        // 'http://spcomapi.cnec.br/api'
        'http://desenv.iesb.br/henrique.souza/sistemasAcademicos/web-service/'
    :
    process.env.NODE_ENV === 'homologation' ?

        console.log('homologation')
        // 'http://hmlapidescontos.cnec.br/api'
    :
        // console.log('desenv')
        'http://desenv.iesb.br/henrique.souza/sistemasAcademicos/web-service/'

);