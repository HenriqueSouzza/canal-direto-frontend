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
        this.state = {

            session: 'f6e76f5b46604c06807724055784d907',

            env: 'production',

            sender: {
                name: 'Willy Chagas',
                email: 'chagaswc89@gmail.com',
                phone: {
                    areaCode: '48',
                    number: '991510980',
                },
                document: {
                    type: 'CPF',
                    value: '71783955082'
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
                    id: 1,
                    description: 'Produto 1',
                    quantity: 2,
                    amount: 2,
                },  
                {
                    id: 2,
                    description: 'Produto 2',
                    quantity: 1,
                    amount: 60.00,
                },  
                {
                    id: 3,
                    description: 'Produto 3',
                    quantity: 2,
                    amount: 20.00,
                }

            ],

            creditCard: {
                maxInstallmentNoInterest: 5 // parcelas com desconto
            },
            extraAmount: 10.00,
            reference: 'Teste Pagseguro React'
        }
    }

    // componentDidMount(){
        // if(this.props.dadosCadastrais.dadosUsuario.length <= 0){
            // this.props.onClickPasso({passoAtual: '1'})
        // }
    // }

    onSubmit = values => {
        console.log(values)
    }

    onError = values => {
        console.log(values)
    }

    render(){

        let { loading, dadosUsuario } = this.props.dadosCadastrais

        let initialValues = {
            cpf: dadosUsuario ? dadosUsuario.cpf : '',
        }

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
const mapStateToProps = state => ({ dadosCadastrais: state.dadosCadastrais, acampUnidos: state.acampUnidos })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarDadosEvento, buscarCep }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(PassoDois);