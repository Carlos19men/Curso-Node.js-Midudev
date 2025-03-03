const fs = require('node:fs/promises') //en el caso de las promersas usamos /promeses

//cuando trabajamos con promesas no podemos usar el callback
//cuando trabajamos con promersas, estamos trabajando con un estado asincrono
console.log('leyendo el archivo de forma asincrona con promesas') 

fs.readFile('archivo.txt', 'utf-8').then(text => {
    console.log('archivo leido') 
    console.log(text)
})

console.log('haciendo cosas <-------------------------')
//el call back en este caso es el cuerpo de la función 