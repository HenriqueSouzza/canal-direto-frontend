import React, { useState } from 'react';

import { DialogContainer, Button as ButtonCustom } from 'react-md';

import DataTable from 'react-data-table-component';

import Spinner from '../loading/spinner';

import Button from './button';

import ButtonExport from './buttonExport';

import TableAction from './tableAction';

/**
 * 
 * @param {*} btnAdd 
 * @param {*} btnExportCSV 
 * @param {*} router 
 * @param {*} data 
 */
function btnActionsHeader(btnAdd, btnExportCSV, router, data){

    const btnAction = []

    const btnNovo = (<Button key={1} description={`Adicionar`} color={`btn-success`} icon={`fa-plus`} router={router.location.pathname + '/novo'} />)
    
    const btnExport = (<ButtonExport key={2} description={`Exportar CSV`} data={data} color={`btn-primary`} icon={`fa-file-excel`} />)

    if(btnAdd){
        btnAction.push(btnNovo)
    }
    
    if(btnExportCSV){
        btnAction.push(btnExport)
    }

    return btnAction

}

function Table(props){
    
    const { description, checkbox, columns, data, setCheckbox, router, btnAdd, actions, loading, actionDelete, btnExportCSV } = props

    //Icone do loading da table
    const CustomLoader = () => (<div style={{ padding: '24px' }}> <Spinner color={`text-primary`}/> </div>)
    
    //função para colocar botões de ações no topo da tabela
    const btnActions = btnActionsHeader(btnAdd, btnExportCSV, router, data)
    
    //Estado (hooks) para manipular quando irá apresentar a modal de confirmação 
    const [visibled, setVisibled] = useState(false)

    //Mensagem que será exibida quando clicar em uma das ações (visualizar, duplicar, excluir)
    const [message, setMessage] = useState('Nenhum Texto')

    //Recebe o id para deletar vindo da table action
    const [idDelete, setIdDelete] = useState(null)

    //Habilitar a opção de ações em cada linha da tabela (visualizar, duplicar, excluir)
    if(actions){
        columns.push({
            cell: row => <TableAction setVisibled={setVisibled} setMessage={setMessage} visibled={visibled} router={router} actions={actions} params={row[Object.keys(row)[0]]} setIdDelete={setIdDelete} />, 
            allowOverflow: true,
            // button: true,
            width: '120px',
            name: 'Ações'
        })
    }
    
    const btnConfirm = ([
        { secondary: true, children: 'Cancel', onClick: () => setVisibled(!visibled) },
        <ButtonCustom flat primary onClick={() => (setVisibled(!visibled), actionDelete(idDelete))}>Confirmar</ButtonCustom>
    ])

    return(
        <div>
            <DataTable
                title={description} //Título da tabela
                columns={columns} //Coluna que terão o formulário
                data={data} //Dados do formulario
                actions={btnActions.length > 0 ? btnActions : false} //Atividar o botão de novo
                selectableRows={checkbox} //Opção que recebe um boleano para ativar ou não o checkbox para selecionar um linha específica
                onSelectedRowsChange={checkbox ? setCheckbox : false} // Criar ações do checkbox
                progressPending={loading} //loading
                progressComponent={<CustomLoader />} //Icone do loading
                pagination // Paginação
                noDataComponent={`Não existem dados para ser apresentados`} //Pode criar um componente customizado para apresentar quando não ouver dados
            />
            <DialogContainer
                id="speed-boost"
                visible={visibled}
                title="Ops !"
                onHide={() => setVisibled(!visibled)}
                modal
                actions={btnConfirm}
            >
                {message}
            </DialogContainer>
        </div>
    )
}

export default Table;