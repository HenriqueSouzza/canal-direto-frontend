import React, { Component } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Form, Field } from 'react-final-form';

import { FORM_RULES, composeValidators } from '../../../helpers/validations';

import Button from '../../../components/form/button';

import Input from '../../../components/form/input';

import Upload from '../../../components/form/upload';

import Select from '../../../components/form/select';

import LoadingBody from '../../../components/loading/loadingBody';

import MenuHeader from '../../../components/menu/menuHeader';

import textArea from '../../../components/form/textArea';


class Novo extends Component{

    constructor(props){
        super(props)
    }

    onSubmit = values => {
        console.log(values)
    }

    render(){

        const { loading } = this.props.tickets

        let dataSetor = [
            {id: '1', name: 'text'}
        ]

        let dataCategoria = [
            {id: '1', name: 'text'}
        ]

        return (
            <section className="content">
                <LoadingBody status={loading} />
                <MenuHeader title={`Abrir um novo ticket`} history={this.props.location.pathname} />
                <div className="content-fluid">
                    <div className="card">
                        <div className="card-body">
                            <Form
                                onSubmit={this.onSubmit}
                                render={({handleSubmit}) => (
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div className="row justify-content-center">
                                            <div className="col-md-7">
                                                <Field 
                                                    component={Input} 
                                                    type={`text`}
                                                    name={`assunto`} 
                                                    label={`Assunto:`}
                                                    icon={`fa fa-comment`}
                                                    placeholder={`Digite o assunto do ticket`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.min(5))}
                                                    />
                                                <Field 
                                                    component={Select} 
                                                    name={`setor`} 
                                                    data={dataSetor}
                                                    label={`Setor:`}
                                                    validate={FORM_RULES.required}
                                                    />
                                                <Field 
                                                    component={Select} 
                                                    name={`categoria`} 
                                                    data={dataCategoria}
                                                    label={`Categoria:`}
                                                    validate={FORM_RULES.required}
                                                    />
                                                <Field 
                                                    component={textArea} 
                                                    type={`text`}
                                                    name={`mensagem`} 
                                                    label={`Mensagem:`}
                                                    rows={3}
                                                    placeholder={`Escreva aqui...`}
                                                    validate={composeValidators(FORM_RULES.required, FORM_RULES.min(10),  FORM_RULES.max(300))}
                                                    />
                                            </div>
                                            <div className="col-md-5">
                                                <div className="row justify-content-center">
                                                    <div className="col-md-10 mt-5 text-center">
                                                        <label>Anexar arquivo</label>
                                                        <Field 
                                                            component={Upload} 
                                                            endpoint={'no-url'} //
                                                            name={`arquivo`} 
                                                            validate={composeValidators(FORM_RULES.required, FORM_RULES.min(10),  FORM_RULES.max(300))}
                                                            />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="col-md-3">
                                                {/* <label>&nbsp;</label> */}
                                                <Field
                                                    component={Button}
                                                    name={`sendDados`}
                                                    type={`submit`} 
                                                    color={`btn-success`}
                                                    icon={`fa fa-save`} 
                                                    description={`Salvar`}
                                                    />
                                            </div>
                                        </div>
                                    </form>
                                )}/>
                        </div>
                    </div>
                </div>
            </section>
        )

    }

}

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ tickets: state.tickets })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({  }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Novo);