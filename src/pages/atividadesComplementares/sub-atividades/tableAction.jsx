import React, { Component } from 'react';


class tableAction extends Component{
    
    render(){

        const { data } = this.props

        return(
            <table className="table">
                <thead>
                    <tr>
                        <th><input type="checkbox"/></th>
                        <th>Curso</th>
                        <th>Carga horária</th>
                        <th>Semeste</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map( (row,index) => (
                        <tr key={index}>
                            <td><input type="checkbox"/></td>
                            <td>(1010) - direito</td>
                            <td><input type="text"/></td>
                            <td><input type="text"/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}

export default tableAction;