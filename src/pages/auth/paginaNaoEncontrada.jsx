import React, { Component } from 'react';

class PaginaNaoEncontrada extends Component {

    render(){
        return(
                <div className="col-md-7 bg-white">
                    <div className="row login-body justify-content-center">
                        <div className="col-md-8 align-self-center">
                            <h1>
                                <p className="text-center">
                                    Erro 404
                                </p> 
                            </h1>
                            <p className="text-center">
                                <small>Página não encontrada</small>
                            </p>
                        </div>
                    </div>
                </div>
        )
    }
}

export default PaginaNaoEncontrada;