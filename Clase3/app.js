const express = require('express')

const app = express() 

app.disables('x-powered-by')

app.get('/', (req, res) => {
    res.json({message: 'Hello World'})
})

app.get('/movies', (req, res) => {

})

//puerto 
const PORT = process.env.PORT ?? 1234

//Escuchando el puerto 
app.listen(PORT, () => {
    console.log(`Server ins running on port http://localhost:${PORT}`)
})


