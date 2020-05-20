import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { Form, Field } from 'react-final-form';

import Input from '../../../components/form/input';

import Button from '../../../components/form/button';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import LoadingBody from '../../../components/loading/loadingBody';

import { buscarDadosEvento, buscarCep } from './actions';

import Select from '../../../components/form/select';

import { DirectPayment, payment } from 'pagseguro-react';


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
                street: '', //'Av Campeche',
                number: '', //1111,
                complement: '', //'Casa',
                district: '', //'Campeche',
                city: '', //'Florianópolis',
                state: '', //'SC',
                country: '', //'BRA',
                postalCode: '', //'88063789'
            },

            items: [
                {
                    id: dadosInscricao.evento.evento,
                    description: dadosInscricao.evento.nome_evento,
                    quantity: 1,
                    // amount: 2,
                },  
            ],

            creditCard: {
                maxInstallmentNoInterest: 3 // parcelas com desconto
            },
            // extraAmount: 10.00,
            reference: 'Inscricao para acamp unidos'
        }
    }

    onSubmit = values => {
        console.log(values)
    }

    onError = values => {
        console.log(values)
    }

    render(){

        let { loading, dadosInscricao } = this.props.acampUnidos

        // let initialValues = {
        //     cpf: dadosUsuario ? dadosUsuario.cpf : '',
        // }

        console.log(dadosInscricao)

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
                        shipping={this.state.shipping}    
                        billing={this.state.billing}                                               
                        items={this.state.items}                                                   	    
                        onError={this.onError.bind(this)}
                        onSubmit={(e) => this.onSubmit(e)}
                    />
                    <div className="col-md-6 text-center">
                        <button 
                            className="btn btn-danger col-md-6" 
                            onClick={() => this.props.onClickPasso({passoAtual: '1'})}>Voltar</button>
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
// const mapDispatchToProps = dispatch => bindActionCreators({ buscarDadosEvento, buscarCep }, dispatch);


export default connect(mapStateToProps, null )(PassoDois);