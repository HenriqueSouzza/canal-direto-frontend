import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

import Select from '../../components/form/select';
import { buscarPapelUsuario } from '../../pages/auth/actions';



function Header(props) {

    const onSubmit = values => {
        console.log(values)
    }

    const onChange = value => {
        if(value){
            props.buscarPapelUsuario('?where[id]=' + value)
        }
    }

    let data = (props.auth.user.papeis.length > 0 ? props.auth.user.papeis.map(row => ({id: row.id, name: row.papel}) ) : [])

    const initialValues = {
        papeis: 1
    }
    
    return (
        <nav className="main-header navbar navbar-expand navbar-light navbar-white text-sm">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to={`#`} className="nav-link" data-widget="pushmenu">
                        <i className="fas fa-bars"></i>
                    </Link>
                </li>
            </ul>
            <div className="form-inline ml-auto">
                <span className="mr-3 mt-1">Assumir papel:</span>
                <Form
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} onChange={(e) => onChange(e.target.value)}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="input-group input-group-sm">
                                        <Field name="papeis">
                                        {props => (
                                            <select className={`form-control form-control-navbar`} {...props.input}>
                                                <option value="">Selecione</option>
                                                {data.map(row => ( <option key={row.id} value={row.id}>{row.name}</option> ))}
                                            </select>
                                        )}
                                        </Field>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}/>
            </div>
        </nav>
    )
}

/**
 * @param {*} state 
 */
const mapStateToProps = state => ({ auth: state.auth })

/**
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ buscarPapelUsuario }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps )(Header);