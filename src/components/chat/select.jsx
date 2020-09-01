import React from 'react';

function Select(props){

    const { disabled } = props

    const {touched ,error, data} = props.meta

    return(
        <select className={`form-control ${touched && error && "is-invalid"}`} disabled={disabled} {...props.input}>
            <option value="">Selecione</option>
            {data.map(response => (
                <option key={response.id} value={response.id}>{response.name}</option>
            ))}
        </select>
    )
}

export default Select;