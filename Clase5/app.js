import express, { json } from 'express'
import { corsMidleware } from './middlewares/cors.js'
import { createMovieRouter } from './routes/movies.js'

export const createApp = ({movieModel}) =>{
    const app = express()
    app.use(json())
    app.use(corsMidleware())
    app.disable('x-powered-by')

    //con esto ya estamos aplanando la aplicación 
    //agrupando la ruta 
    app.use('/movies', createMovieRouter({movieModel}))


    const PORT = process.env.PORT ?? 1234

    //Escuchando el puerto 
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`)
    })

    return app
}








