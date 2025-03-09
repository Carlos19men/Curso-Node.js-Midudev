const http = require('hode:http')

const processRequest = (req,res) => {

}

const sever = http.createServer(processRequest)

server.listen(1234, () => {
    console.log('server listening on port http://localhost:1234')
})