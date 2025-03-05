const fs = require('node:fs/promises')

const folder = process.argv[2] ?? '.'

/*
    el la posición 2 es en el caso de que se ingrese un argumento
    que en este caso seria la carpeta que se quiere listar
*/

console.log('Listando archivos de la carpeta: ', folder)

fs.readdir(folder)
    .then(files => {
        //listamos todos los archivos de la carpeta folder
        files.forEach(file => {
            console.log(file)
        })
    })
    .catch(error => {
        if(error){
            console.log('Error: ', error)   
            return ; 
        }
    })  

    /*
        ahora tenemos una mini aplicación con la que podemos listar todos los archivos 
        de un directorio, si no se ingresa un directorio 
        se listara el directorio actual
    */
