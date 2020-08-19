import React, { useState } from 'react';

import DropzoneComponent from 'react-dropzone-component';

function Upload(props){

    const { endpoint } = props

    const {touched, error} = props.meta

    const componentConfig = {
        dropzoneSelector: '',
        iconFiletypes: ['.jpg', '.png', '.gif', '.pdf', '.doc'], //extensões permitidas
        showFiletypeIcon: true,
        postUrl: endpoint,
    };

    const djsConfig = { 
        autoProcessQueue: endpoint != 'no-url' ? true : false, //quando inserir a imagem, ele apresenta a barra de loading
        acceptedFiles: "image/jpeg, image/png, image/gif, application/pdf, application/msword", //Força a abertura de arquivo com essas extensões
        addRemoveLinks: true, // habilita a opção de deletar
    }

    const [dropzone, setDropzone] = useState([]);

    /**
     * Adiciona o arquivo na fila
     * @param {*} file 
     */
    const onAddedFile = file => {
        dropzone.push(file)
        setDropzone(dropzone)
    }

    /**
     * Remove o arquivo da fila
     * @param {*} file 
     */
    const removeArchive = file => {
        dropzone.splice(dropzone.indexOf(file), 1)
    }
    
    /**
     * Caso houver algum tipo de erro no arquivo, ele entra nessa função e remove o arquivo
     * @param {*} file 
     * @param {*} message 
     */
    const errorArchive = (file, message) => {
        dropzone.splice(dropzone.indexOf(file), 1)
    }

    /**
     * É função é responsavel por retornar o estado inicial do dropzone
     * @param {*} dataDropzone 
     */
    const initCallBack = (dataDropzone) => {
        props.input.onChange(dataDropzone.files)
    }
    
    const eventHandlers = { 
        init: (dataDropzone) => initCallBack(dataDropzone),
        addedfile: file => onAddedFile(file),
        removedfile: file => removeArchive(file),
        error: (file, message) => errorArchive(file, message),
    }

    props.input.onChange(dropzone)

    console.log(touched, error, dropzone, props.input)

    return(
        <>
            <DropzoneComponent
                {...props}
                {...props.input}
                config={componentConfig}
                eventHandlers={eventHandlers}
                djsConfig={djsConfig}
            />
            <div className={`${touched && error && "text-danger"}`}>
                {touched && error && <strong>{error}</strong>}
            </div>
        </>
    )   
}

export default Upload;