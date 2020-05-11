import React, { Component } from 'react';

class PaginaNaoEncontrada extends Component {

    render(){
        return(
            <section className="content">
                <div className="content-fluid">
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
            </section>
        )
    }
}

export default PaginaNaoEncontrada;