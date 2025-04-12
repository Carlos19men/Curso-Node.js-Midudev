import { Router } from 'express'
import { MovieController } from '../controladores/movies.js'
import { MovieModel } from '../models/mysql/movies.js'


export const createMovieRouter = ({ movieModel }) =>{
    const moviesRouter = Router()

    const movieController = new MovieController({movieModel: MovieModel})

    moviesRouter.get('/', movieController.getAll)

    moviesRouter.get('/:id',  movieController.getById)
    /*
        Crear una nueva movie

        en este caso nosotros creamos el id 
    */
    moviesRouter.post('/',movieController.create)


    moviesRouter.delete('/:id',movieController.delete) 

    moviesRouter.patch('/:id',movieController.update)

    return moviesRouter
}
