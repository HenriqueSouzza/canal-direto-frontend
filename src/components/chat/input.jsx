import React from 'react';

function Input(props){

    const {touched ,error} = props.meta

    return(
            <input
                {...props.input}
                {...props}
                type={`text`}
                name={`message`}
                placeholder={`Digite aqui...`}
                className={`form-control ${touched && error && "is-invalid"}`}
            />
    )
}

export default Input;