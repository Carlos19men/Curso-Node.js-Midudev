const http = require('node:http')
const { findAvailablePort } = require('./13.free-port.js')

const port = process.env.PORT ?? '3000'

const server = http.createServer((req,res) =>{

    //la parte del servidor 
    console.log('request received')
    res.end('Hello World')
})

/*
    un truco que sirve es colocar el puerto 0, esto 
    hará que el servidor busque automaticamente el 
    primer puerto disponible que encuentre 

    para que un puerto sea clickeable se le agrega 
    http://localhost:puerto 
*/ 

findAvailablePort(port).then(_port => {
    server.listen(_port, () => {
        console.log(`Server listening on http://localhost:${server.address().port}`)
    })
})


