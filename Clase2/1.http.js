const http = require('node:http') //protocolo HTTP 
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234 

//proceso de petición
const processRequest = (req,res) => {

    if(req.url === '/'){
        res.status = 200 // ok 
        res.setHeader('Content-Type','text/html; charset=utf-8')
        res.end('<h1>Bienvenido a la página principal</h1>')
    }else if (req.url === '/midudev.jpg') {
        /*en este caso especificamos que tiene que devolver  una
            una imagen 
        */
        //data: es un buffer de datos 

        /* 
            en este read file lo que estamos haciendo es leer
            los datos binarios de la imagen y si no hay errores 
            al momento de leer la imagen se envía la data, que 
            son los datos binarios que conrresponden a la imagen
            (data)
        */
        fs.readFile('./midudev.jpg', (err,data) => {
            if(err){
                res.status = 500
                res.end('<h1> 500 internal Server Error </h1>')

                //si hay un error siempre es necesario tratarlos 

            }else {
                res.setHeader('Content-Type', 'image/png')
                res.end(data)
            }
        })
    }
    
    else if (req.url === '/contacto'){
        res.status = 200 // ok
        res.setHeader('Content-Type','text/html; charset=utf-8')
        res.end('<h1>Contáctanos<h1>')
    }else{
        res.status = 404 // not found
        res.setHeader('Content-Type','text/html; charset=utf-8')
        res.end('<h1>404 Página no encontrada</h1>')
    }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
    console.log(`server listening on port http://localhost:${desiredPort}`)
})