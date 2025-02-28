const fs = require('node:fs') // a partir de v16 de Node.js, se recomienda poner node: 

//información sobre el archivo
const stats = fs.statSync('archivo.txt')

//Con esto podemos recuperar información de un archivo 
console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size
)