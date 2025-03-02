const fs = require('node:fs')

console.log('Leyendo el primer archivo ')
//esto devuelve un buffer de memoria
const text = fs.readFileSync('./archivo.txt','utf-8')
//la codificacion es opcional, pero es util para poder interpretar la información

console.log(text)



console.log('Leyendo el segundo archivo ')

const secondText = fs.readFileSync('./archivo2.txt','utf-8')

console.log(secondText)