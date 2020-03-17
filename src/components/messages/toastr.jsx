import React from 'react';

import ReduxToastr from 'react-redux-toastr';

function Toastr(props){

    return(
        <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            getState={(state) => state.toastr} // This is the default
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick/>
    )

}

export default Toastr;