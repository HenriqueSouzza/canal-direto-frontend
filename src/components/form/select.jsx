import React from 'react';

function Select(props){

    const { label, disabled } = props

    const {touched ,error, data} = props.meta

    return(
        <div className={`form-group`}>
            <label>{label}</label>
            <div className="input-group">
                <select className={`form-control ${touched && error && "is-invalid"}`} disabled={disabled} {...props.input}>
                    <option value="">Selecione</option>
                    {data.map(response => (
                        <option key={response.id} value={response.id}>{response.name}</option>
                    ))}
                </select>
                <div className={`${touched && error && "invalid-feedback"}`}>
                    {touched && error && <span className="help-block">{error}</span>}
                </div>
            </div>
        </div>
    )
}

export default Select;