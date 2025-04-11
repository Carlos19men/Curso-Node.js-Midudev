import zod from 'zod'
import { MovieModel } from '../models/mysql/movies.js'
import { validateMovie,validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
    static async getAll (req, res) {
        const { genre } = req.query
        console.log(genre)
        const movies = await MovieModel.getAll({genre})
        return res.json(movies)
    }

    static async getById (req,res) {
        const {id} = req.params //extrahemos el id de la url 

        /*
            Busamos en el json de peliculas la pelicula por 
            el id 
        */
        const movie = await MovieModel.getById({ id })
    
        if(movie) return res.json(movie) //retornamos la pelicula 
    
        //si no tenemos la pelicula 
        res.status(404).json({message: 'Movie not found'})
    }

    static async create (req,res) {
         //validamos el req.body 
        const result = validateMovie(req.body)
        console.log(result)
    
        if(!result.success){
        //se podue usar el 400 o el 422
            return res.status(400).json({
                error: JSON.parse(result.error.message)
            })
        }
    
        // en base de datos 
        const newMovie = await MovieModel.create({input: result.data})
    
        res.status(201).json(newMovie)
    }

    //puse un comentario
    static async delete (req,res){
    
        const { id } = req.params 
        
        const result = await MovieModel.delete( { id } )
    
        if(!result){
            return res.status(404).json({ message: 'Movie not found'})
        }
        return res.json({message: 'Movie deleted'})
    }

    static async update (req,res) {
        const result = validatePartialMovie(req.body)
    
        if(!result.success){
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
    
        const { id } = req.params
        
        const updateMovie = await MovieModel.update({id,input: result.data})
    
        return res.json(updateMovie)
    }
}
