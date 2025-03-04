const pt = require('node:path')


//es una mala práctica crear rutas 

//los sitemas operativos usan diferentes barras para las rutas 

console.log('La barra utilizada por tu sistema operativo es: ',pt.sep)


//unir rutas con path.join cuando buscamos urta lo que hacemos es lo siguiente 
const ruta = pt.join('carpeta1','carpeta2','carpeta3')
console.log(ruta)

//nombre del fichero de una ruta dad 
const nombre = pt.basename('caperta1/carpeta2/carpeta3/password.txt')
console.log(nombre)

//le podemos quitar la extensión
const nombre2 = pt.basename('caperta1/carpeta2/carpeta3/password.txt','.txt')
console.log(nombre2)

//obtener la extensión 
const extensión = pt.extname('foto.jpg')
console.log(extensión)