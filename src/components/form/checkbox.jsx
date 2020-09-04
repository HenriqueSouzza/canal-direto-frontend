import React from 'react';

import { Checkbox, FormControlLabel } from '@material-ui/core';

function checkbox(props){

    const { touched, error } = props.meta
    console.log(touched, error);

    // const style = touched || error

    const Check = (
        // <Checkbox {...props.input} style ={ touched || error ?  { color: 'red' } : ``} checked={props.input.checked}>
        <Checkbox {...props.input} checked={props.input.checked}>
        </Checkbox>
    )
    

    return(
        <FormControlLabel
            control={Check}
            label={props.label}
        />
    )   
}

export default checkbox;