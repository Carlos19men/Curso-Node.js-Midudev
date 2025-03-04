//Esto solo en los modulos nativos 
//que no tienen promesas nativas 
// const {promisity} = require('node:util')
// const readFile = promisify(fs.readFile)


const fs = require('node:fs')
console.log('leyendo el archivo de forma asincrona') 

fs.readFile('archivo.txt', 'utf-8', (err,text) => {
    console.log('archivo leido') 
    console.log(text)
})
//el call back en este caso es el cuerpo de la función 

for(let i = 0; i< 100; i++){
    console.log('->'+i)
}
//que se van a ejecutar en segundo plano (err,text)