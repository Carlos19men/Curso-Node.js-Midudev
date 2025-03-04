const fs = require('node:fs')

//leemos todos los ficheros dentro de la carpeta actual 

fs.readdir('.',(err,files) =>{
    if(err){
        console.log('error al leer la carpeta')
        return; 
    }

    files.forEach((file)=>{
        console.log(file)
    })
})