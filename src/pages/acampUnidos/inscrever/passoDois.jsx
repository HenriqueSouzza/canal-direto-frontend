import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import LoadingBody from '../../../components/loading/loadingBody';

import { salvarInscricao } from './actions';

import { DirectPayment } from 'pagseguro-react';


class PassoDois extends Component{

    constructor(props){
        super(props)

        let { dadosInscricao } = props.acampUnidos

        this.state = {

            session: dadosInscricao.sessionId,

            env: 'production',

            sender: {
                name: dadosInscricao.pessoa.nome_compl,
                email: dadosInscricao.pessoa.email,
                phone: {
                    areaCode: dadosInscricao.pessoa.telefone.substr(0, 2),
                    number: dadosInscricao.pessoa.telefone.substr(2,9),
                },
                document: {
                    type: 'CPF',
                    value: dadosInscricao.pessoa.cpf
                },
            },

            shipping: {
                type: 3,
                cost: 10.00,
                street: 'Av Campeche',
                number: 1111,
                complement: 'Casa',
                district: 'Campeche',
                city: 'Florianópolis',
                state: 'SC',
                country: 'BRA',
                postalCode: '88063789'
            },

            billing: {
                street: 'Av Campeche',
                number: 1111,
                complement: 'Casa',
                district: 'Campeche',
                city: 'Florianópolis',
                state: 'SC',
                country: 'BRA',
                postalCode: '88063789'
            },

            items: [
                {
                    id: dadosInscricao.evento.evento,
                    description: dadosInscricao.evento.nome_evento,
                    quantity: 1,
                    amount:  dadosInscricao.evento.valor,
                },  
            ],

            creditCard: {
                maxInstallmentNoInterest: 3 // parcelas com desconto
            },
            // extraAmount: 10.00,
            reference: 'Inscriçao para acamp unidos'
        }
    }

    onSubmit = values => {
        this.props.salvarInscricao(values)
    }

    onError = values => {
        console.log(values)
    }

    render(){

        let { loading } = this.props.acampUnidos

        return(
            <div className="content-fluid">
                <LoadingBody status={loading} />
                <div className="text-left w-90">
                    <div className="bg-secondary rounded text-center">
                        <h4>Forma de pagamento</h4>
                    </div>
                    <DirectPayment
                        env={this.state.env}
                        session={this.state.session}
                        extraAmount={this.state.extraAmount}                                       
                        reference={this.state.reference}
                        creditCard={this.state.creditCard}                                         
                        sender={this.state.sender}                                                
                        // shipping={this.state.shipping}    
                        // billing={this.state.billing}                                               
                        items={this.state.items}                                                   	    
                        onError={this.onError.bind(this)}
                        onSubmit={(e) => this.onSubmit(e)}
                    />
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 text-center">
                        <button 
                            className="btn btn-danger col-md-4" 
                            onClick={() => this.props.onClickPasso({passoAtual: '1'})}>Voltar passo</button>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ acampUnidos: state.acampUnidos })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ salvarInscricao }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(PassoDois);