import { readFile } from 'node:fs/promises'

//usando async await 
//el async await es asincrono secuencial 

console.log('Leyendo el primer archivo: ')
const text = await readFile('archivo.txt','utf-8')
console.log('hacinedo cosas mientras abre el archivo: ',text)


console.log('Leyendo el primer archivo: ')
const secondText = await readFile('archivo2.txt','utf-8')
console.log('hacinedo cosas mientras abre el archivo: ',secondText)

//otro ejemplo de async await 

async function init(){
    console.log('leyendo el primer archivo ')
    const text = await readFile('archivo.txt','utf-8')
    console.log('primer texto: ',text)
    console.log('haciendo cosas mientras tanto ...')

    
    console.log('leyendo el primer archivo ')
    const secondText = await readFile('archivo2.txt','utf-8')
    console.log('segundo texto: ',secondText)
    console.log('haciendo cosas mientras tanto ...')
}

init()