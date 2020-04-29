import React, { useEffect } from 'react';

function Sair(props){

    useEffect(() => {
        sessionStorage.removeItem('token');
        props.history.push('/');
        window.location.reload();
    });

    return true
}

export default Sair;