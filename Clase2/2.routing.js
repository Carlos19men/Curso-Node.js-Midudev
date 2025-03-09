const http = require('hode:http')
const dittoJson = require('./pokemon/ditto.json')

const processRequest = (req,res) => {
    //de cada reques vamos a sacar el metodo y la url
    
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
                    return res.end('<h1> 404 </h1>')
            }
        case 'POST': 
            
    }
}

const sever = http.createServer(processRequest)

server.listen(1234, () => {
    console.log('server listening on port http://localhost:1234')
})