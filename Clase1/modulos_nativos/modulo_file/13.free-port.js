const net = require('node:net')

function findAvailablePort(desiredPort){
    return new Promise((resolve, reject) => {
        //creamos el servidor 
        const server = net.createServer() 

        //intentamos escuchar por el puerto deseado 
        server.listen(desiredPort, () => {

            /*si pudimos escuchar quiere decir que el puerto 
            esta disponible y lo cerramos  
            */

           //aplicamos desestructurción de parametros
            const { port } = server.address()

            server.close(() => {
                resolve(port)
            })
        })
        

        //si hubo un error podemos escucharlo
        server.on('error', (error) => {
            /*
                "Si el puesto que queremos usar esta ocupado ..."
            */
            if(error.code === 'EADDRINUSE'){
                findAvailablePort(0).then(port => resolve(port))
            }else{
                reject(error)
            }
        })
    })
}

//estamos exportando el modulo para poder usarlo en otros archivos 
module.exports = { findAvailablePort }