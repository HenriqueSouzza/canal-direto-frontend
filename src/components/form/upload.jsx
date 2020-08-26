import React from 'react';

import DropzoneComponent from 'react-dropzone-component';

function Upload(props){

    const { endpoint, onChangeArchive } = props

    const componentConfig = {
        dropzoneSelector: '',
        iconFiletypes: ['.jpg', '.png', '.pdf', '.doc'], //extensões permitidas
        showFiletypeIcon: true,
        postUrl: endpoint,
    };

    const djsConfig = { 
        autoProcessQueue: endpoint != 'no-url' ? true : false, //quando inserir a imagem, ele apresenta a barra de loading
        acceptedFiles: "image/jpeg, image/png, image/gif, application/pdf, application/msword", //Força a abertura de arquivo com essas extensões
        addRemoveLinks: true, // habilita a opção de deletar
    }

    /**
     * Adiciona o arquivo na fila
     * @param {*} file 
     */
    const onAddedFile = file => {
        onChangeArchive(file, 1)
    }

    /**
     * Remove o arquivo da fila
     * @param {*} file 
     */
    const removeArchive = file => {
        onChangeArchive(file, 0)
    }
    
    /**
     * Caso houver algum tipo de erro no arquivo, ele entra nessa função e remove o arquivo
     * @param {*} file 
     * @param {*} message 
     */
    const errorArchive = (file) => {
        onChangeArchive(file, 1)
    }

    const eventHandlers = { 
        addedfile: file => onAddedFile(file),
        removedfile: file => removeArchive(file),
        error: (file, message) => errorArchive(file, message),
    }

    return(
        <>
            <DropzoneComponent
                {...props}
                config={componentConfig}
                eventHandlers={eventHandlers}
                djsConfig={djsConfig}
            />
        </>
    )   
}

export default Upload;