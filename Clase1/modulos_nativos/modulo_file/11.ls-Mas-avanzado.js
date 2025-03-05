const fs = require('node:fs/promises')
const path = require('node:path')


//aquí lo que hacemos es ver si el usuario ingresó una carpeta o no, si no ingresó nada, se toma la carpeta actual
const folder = process.argv[2] ?? '.'
console.log(folder)

//creamos una función asincrona para poder usar await
async function ls (folder){
    let files 

    try{
        //abrilos la carpeta de archivos 
        files = await fs.readdir(folder)
    }catch(error){
        //controlamos el error con un catch 
        console.error(`No se pudo leer la carpeta ${folder}`)
        process.exit(1)
    }

    //creamos todas las promesas de todos lo archivos 

    const filesPromises = files.map(async file => {
        //vamos a recopilar la información de cada archivo
        const filePath = path.join(folder, file)

        let stats
        //vamos a intentar obtener el stats de cada archivo (información)
        try{
            stats = await fs.stat(filePath) 
        }catch(error){
            console.error(`No se pudo leer la información de ${file}`)
            process.exit(1)
        }

        //si logramos abrir el archivo podemos ver la información
        const isDirectory = stats.isDirectory()
        const symbol = isDirectory ? '📁' : '📄'
        const fileSize = stats.size
        const fileModified = stats.mtime.toDateString()
        
        return `${symbol} ${file} - ${fileSize} bytes, ${fileModified}`	
    })

    //esperamos todas las promesas 
    const filesInfo = await Promise.all(filesPromises)

    filesInfo.forEach(fileInfo => console.log(fileInfo))

}

//llamamos a la función
ls(folder)