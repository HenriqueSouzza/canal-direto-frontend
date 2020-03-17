import React from 'react';

import Select from 'react-select';
 
function SelectMultiple(props){

    const {
        label,
        readOnly,
        input,
        options,
        name,
        id,
        meta: { touched, error }, 
        isMulti,
        closeMenu
    } = props;

    return (
        <div className={`form-group`}>
            <label>{label}</label>
            <Select
                {...input}
                id={id}
                value={input.value || ""}
                name={name}
                options={options}
                onChange={value => input.onChange(value)}
                onBlur={() => { }}
                placeholder="Selecione"
                closeMenuOnSelect={closeMenu}
                isMulti={isMulti}
                isDisabled={readOnly}
            />
            {input.multiple ? (
                <div>
                    <button type="button" className={`btn btn-light pull-right`} onClick={value => input.onChange((value = options))}>
                        Selecionar Todos
                    </button>
                    <button type="button" className={`btn btn-light pull-right`} onClick={value => input.onChange((value = []))}>
                        Retirar Todos
                    </button>
                </div>
            ) : null}
            <div className={`${touched && error && "invalid-feedback"}`}>
                {touched && error && <span className="help-block">{error}</span>}
            </div>
        </div>
    )
}

export default SelectMultiple;