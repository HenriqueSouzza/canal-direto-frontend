import React from 'react';

import { MenuButtonColumn } from 'react-md';

function TableAction(props){
    
    const { setVisibled, visibled, setMessage, setIdDelete, router, actions, params } = props

    const menuActions = []

    actions.map(action => {
        switch (action) {
            case 'can_detail':
                menuActions.push({
                    leftIcon: <i className="fa fa-eye"></i>,
                    primaryText: 'Visualizar',
                    onClick: () => {router.push( `${router.location.pathname}/${params}/visualizar`)}
                })
                break;
    
            case 'can_create':
                menuActions.push({
                    leftIcon: <i className="fa fa-clone"></i>,
                    primaryText: 'Duplicar',
                    onClick: () => {router.push( `${router.location.pathname}/${params}/novo`)}
                })
                break;
    
            case 'can_edit':
                menuActions.push({
                    leftIcon: <i className="fa fa-edit"></i>,
                    primaryText: 'Editar',
                    onClick: () => {router.push( `${router.location.pathname}/${params}/editar`)}
                })
                break;
    
            case 'can_remove':
                menuActions.push({
                    leftIcon: <i className="fa fa-trash"></i>,
                    primaryText: <span className="md-text--error">Delete</span>,
                    onClick: () => (setVisibled(!visibled), setMessage('Deseja realmente remover esse item ?'), setIdDelete(params))
                })
            break;
        }
    })

    return(
        <div>
            <MenuButtonColumn 
                icon 
                // raised
                primary
                menuItems={menuActions}
                simplifiedMenu={false}
                repositionOnScroll={false}>
                    <i className="fa fa-ellipsis-v"></i>
            </MenuButtonColumn> 
        </div>
    )
}

export default TableAction;