import { randomUUID } from 'crypto'
import { Router } from 'express'
import { readJSON } from '../utils'
import { validateMovie,validatePartialMovie } from '../schemas/movies.js'


import { MovieModel } from '../models/movie.js'

const movies = readJSON('../movies.json')
export const moviesRouter = Router()

moviesRouter.get('/', async (req, res) => {
    const { genre } = req.query
    const movies = await MovieModel.getAll({genre})
    res.json(movies)
})

moviesRouter.get('/:id', (req, res) => {
    const {id} = req.params //extrahemos el id de la url 

    /*
        Busamos en el json de peliculas la pelicula por 
        el id 
    */
    const movie = movies.find(movie => movie.id === id)

    if(movie) return res.json(movie) //retornamos la pelicula 

    //si no tenemos la pelicula 
    res.status(404).json({message: 'Movie not found'})
})


/*
    Crear una nueva movie

    en este caso nosotros creamos el id 
*/
app.post('/movies',(req,res) => {
   //validamos el req.body 

   const result = validateMovie(req.body)

   if(!result.success){
    //se podue usar el 400 o el 422
    return res.status(400).json({
        error: JSON.parse(result.error.message)
    })
   }
    const newMovie = {
        "id": randomUUID(), // uuid v4
        ...result.data
    }
    /**
     *   ..result.data no es lo mismo que req.body
     *  result.data ya sabemos lo que es 
     * 
     * req.body no sabemos que nos estan metiendo, 
     * y podria ser de todo un poco
     */

    console.log(newMovie)

    /* 
        ESto no es rest porque estamos guardando 
        el estado de la aplicación en memoria 
    */

   movies.push(newMovie)

   res.status(201).json(newMovie)
})


moviesRouter.delete('/:id',(req,res) => {
    
    const { id } = req.params 
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if(movieIndex === -1){
        return res.status(404).json({message: 'Movie not found'})
    }
    movies.splice(movieIndex, 1)
    return res.json({message: 'Movie deleted'})
}) 

moviesRouter.patch('/:id',(req,res) => {
    const result = validatePartialMovie(req.body)

    if(!result.success){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if(movieIndex < 0 ){
        return res.status(404).json({message: 'movie not found'})
    }


    /**
     * Todos los datos validados de movies[movieIndex] y 
     * todos los nuevos datos de resul.data 
     */
    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }
    console.log(updateMovie)
    movies[movieIndex] = updateMovie

    return res.json(updateMovie)


})
