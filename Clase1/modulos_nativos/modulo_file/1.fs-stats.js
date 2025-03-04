const fs = require('node:fs') // a partir de v16 de Node.js, se recomienda poner node: 

//forma sincrono, secuencial...

//información sobre el archivo
const stats = fs.statSync('archivo.txt')

//Con esto podemos recuperar información de un archivo 
console.log(
    stats.isFile(), // si es un archivo 
    stats.isDirectory(), //si es un directorio 
    stats.isSymbolicLink(), // si es un enlace simbolico 
    stats.size //tanali en bytes 
)