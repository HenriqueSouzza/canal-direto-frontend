import React from 'react';

import { Checkbox, FormControlLabel } from '@material-ui/core';

function checkbox(props){

    return(
        <FormControlLabel
            control={<Checkbox {...props.input} checked={props.input.checked}></Checkbox>}
            label={props.label}
        />
    )   
}

export default checkbox;