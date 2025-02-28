const fs = require('node:fs')

console.log('Leyendo el primer archivo ')
//esto devuelve un buffer de memoria
const text = fs.readFileSync('./archivo.txt','utf-8')
//la codificacion es opcional, pero es util para poder interpretar la información

console.log(text)