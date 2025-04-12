import { validateMovie,validatePartialMovie } from '../schemas/movies.js'

export class MovieController {

    //constructor
    constructor({movieModel}){
        this.movieModel = movieModel
    }


    getAll = async (req, res) =>  {
        const { genre } = req.query
        console.log(genre)
        const movies = await this.movieModel.getAll({genre})
        return res.json(movies)
    }

    getById = async (req, res) =>  {
        const {id} = req.params //extrahemos el id de la url 

        /*
            Busamos en el json de peliculas la pelicula por 
            el id 
        */
        const movie = await this.movieModel.getById({ id })
    
        if(movie) return res.json(movie) //retornamos la pelicula 
    
        //si no tenemos la pelicula 
        res.status(404).json({message: 'Movie not found'})
    }

    create = async (req, res) =>  {
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
        const newMovie = await this.movieModel.create({input: result.data})
    
        res.status(201).json(newMovie)
    }

    //puse un comentario
    delete = async (req, res) => {
    
        const { id } = req.params 
        
        const result = await this.movieModel.delete( { id } )
    
        if(!result){
            return res.status(404).json({ message: 'Movie not found'})
        }
        return res.json({message: 'Movie deleted'})
    }

    update = async (req, res) =>  {
        const result = validatePartialMovie(req.body)
    
        if(!result.success){
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
    
        const { id } = req.params
        
        const updateMovie = await this.movieModel.update({id,input: result.data})
    
        return res.json(updateMovie)
    }
}
