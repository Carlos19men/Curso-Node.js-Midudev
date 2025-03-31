import express, { json } from 'express'
import { readJSON } from './utils.js'
import { moviesRouter } from './routes/movies.js'
import { corsMidleware } from './middlewares/cors.js'

const movies = readJSON('./movies.json')


const app = express()
app.use(json())
app.use(corsMidleware())
app.disable('x-powered-by')



app.get('/', (req, res) => {
    res.json({message: 'Hello World'})
})

//con esto ya estamos aplanando la aplicación 
//agrupando la ruta 
app.get('/movies', moviesRouter)


const PORT = process.env.PORT ?? 1234

//Escuchando el puerto 
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})


