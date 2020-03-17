import React from 'react';

import MenuHeader from '../../components/menu/menuHeader';

import Box from '../../components/card/box';

function Dashboard(props){
    return(
        <section className="content">
            <MenuHeader title={`Dashboard`} history={props.location.pathname} />  
            <div className="content-fluid">
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <Box number={150} description={`inscritos`} icon={`fas fa-users`} link={`/`} color={`bg-info`}/>
                    </div>
                    <div className="col-lg-3 col-6">
                        <Box number={140} description={`inscritos`} icon={`fas fa-users`} link={`/inscritos`} color={`bg-success`}/>
                    </div>
                    <div className="col-lg-3 col-6">
                        <Box number={130} description={`inscritos`} icon={`fas fa-users`} link={`/inscritos`} color={`bg-primary`}/>
                    </div>
                    <div className="col-lg-3 col-6">
                        <Box number={135} description={`inscritos`} icon={`fas fa-users`} link={`/inscritos`} color={`bg-danger`}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard;