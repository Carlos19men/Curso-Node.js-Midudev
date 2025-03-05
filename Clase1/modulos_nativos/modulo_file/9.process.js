// argumentos de entrada

console.log('->'+process.argv)

//podemos controlar el proceso y su salida 
//console.log(process.exit(1))

//podemos controlar eventos del proceso
process.on('exit',(()=>{
    //limpiar recursos
}))



//current working directory , me devuelve la ruta donde se esta ejecutando el script
console.log(process.cwd())

//platform, me devuelve el sistema operativo
console.log(process.env.VAR1)