import { Router } from 'express'
import { MovieController } from '../controladores/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)

moviesRouter.get('/:id',  MovieController.getById)
/*
    Crear una nueva movie

    en este caso nosotros creamos el id 
*/
moviesRouter.post('/',MovieController.create)


moviesRouter.delete('/:id',MovieController.delete) 

moviesRouter.patch('/:id',MovieController.update)
