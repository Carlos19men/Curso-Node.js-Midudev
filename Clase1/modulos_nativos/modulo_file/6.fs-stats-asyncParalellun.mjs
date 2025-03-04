
//Basicamente ejecutar varias promesas en paralelo 

import { readFile } from "node:fs/promises";

Promise.all([
    readFile('./archivo.txt','utf-8'),
    readFile('./archivo2.txt','utf-8')
]).then(([text1,text2])=>{
    console.log('Archivo 1: ',text1)
    console.log('Archivo 2: ',text2)   
}
)

console.log('Leyendo los archivos...')
/*
    En este caso lo que le estamos pidiendo es que lea los dos archivos 
    y cuando termine de leer los dos archivos es que vamos a seguir ejecutando el codigo

*/




