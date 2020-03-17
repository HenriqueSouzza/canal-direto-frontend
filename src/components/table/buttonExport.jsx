import React from 'react';

function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(array[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
    let ctr = 0;
    keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        
        ctr++;
    });
    result += lineDelimiter;
    });

    return result;
} 

function downloadCSV(array) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
}


function ButtonExport(props){

    const { description, color, icon, data } = props

    return(
        <button className={`btn ${color}`} onClick={() => downloadCSV(data)}>
            <i className={`fa ${icon}`}></i> {description}
        </button>
    )
}

export default ButtonExport;