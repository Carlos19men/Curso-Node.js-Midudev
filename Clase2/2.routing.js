const http = require('node:http')
const dittoJson = require('./pokemon/ditto.json')

const processRequest = (req,res) => {
    //de cada reques vamos a sacar el metodo y la url
    
    //obtenermos el metodo y la url de la request 
    const {method, url } = req

    switch (method){
        case 'GET': 
            switch(url){
                case '/pokemon/ditto':
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end(JSON.stringify(dittoJson))
                default:
                    res.statusCode = 404
                    res.setHeader('content-Type', 'text/html; charset=utf-8')   
                    return res.end('<h1> 404 NOT FOUND </h1>')
            }
        case 'POST': 
            switch (url) {
                case '/pokemon': {
                    let body = ''
                    
                    //escuchar el evento data 
                    req.on('data', chunck => {
                        body += chunck.toString()
                    })

                    //finalizado el evento 
                    req.on('end', () => {
                        const data = JSON.parse(body)

                        //llamar a una base de datos para guardar la info
                        res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'})
                       
                        data.timestap = Date.now()
                        res.end(JSON.stringify(data))
                    })

                    break
                }

                //en caso de algun error 
                default: 
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/plain; charsert=utf-8')
                    return res.end('<h1> 404 not found...</h1>')
                    
            }
            
    }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
    console.log('server listening on port http://localhost:1234')
})