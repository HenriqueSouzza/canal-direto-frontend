import React from 'react';

import DropzoneComponent from 'react-dropzone-component';

function Upload(props){

    const { endpoint } = props

    const componentConfig = {
        dropzoneSelector: '',
        iconFiletypes: ['.jpg', '.png', '.gif'], //extensões permitidas
        showFiletypeIcon: true,
        postUrl: endpoint,
    };

    var djsConfig = { 
        autoProcessQueue: endpoint != 'no-url' ? true : false, //quando inserir a imagem, ele apresenta a barra de loading
        acceptedFiles: "image/jpeg,image/png,image/gif", //Força a abertura de arquivo com essas extensões
        addRemoveLinks: true, // habilita a opção de deletar
    }

    let dropzone = []
     
    const addArchive = (file) => {
        console.log(file)
        dropzone = file
        // props.input.onChange(file)
    }

    const removeArchive = (file) => {
        console.log(file)
        if (dropzone) {
            dropzone.removeFile()
        }
    }


    const error = (file) => {
        console.log(file)
        if (dropzone) {
            dropzone.removeFile()
        }
    }

    const eventHandlers = { 
        addedfile: (file) => addArchive(file),
        removedfile: (file) => removeArchive(file),
        error: (file) => error(file)
    }

    return(
            <DropzoneComponent
                {...props}
                config={componentConfig}
                eventHandlers={eventHandlers}
                djsConfig={djsConfig}
            />
    )   
}

export default Upload;