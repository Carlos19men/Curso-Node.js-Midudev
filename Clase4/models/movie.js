import { readJSON } from '../utils.js'
import {randomUUID} from 'crypto'

const movies = readJSON('./movies.json')

export class MovieModel {
    static async getAll ({ genre }) {
        if(genre) {
            return movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
        }
        return movies
    }

    static async getById ({id}){
        const movie = movies.find(movie => movie.id === id)
        return movie 
    }

    /*
        Esta parte de traer la información de la base de datos es la que 
        tenemos que trabajar dentro de nuestro modelo de movie ya que esto 
        forma parte de la lógica de negocio 
    */

    static async create ({input}){
         // en base de datos 
           //esta parte es la que va en nuestro modelo 
            const newMovie = {
                "id": randomUUID(), // uuid v4
                ...input
                //y así es como actualizariamos nuestro base de datos 
            }
            /**
             *   ..result.data no es lo mismo que req.body
             *  result.data ya sabemos lo que es 
             * 
             * req.body no sabemos que nos estan metiendo, 
             * y podria ser de todo un poco
             */
            movies.push(newMovie)
    }

    static async delete( { id } ){
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex === -1) return false

        movies.splice(movieIndex,1)

        return TextTrackCue
    }

    static async update ( { id, input }){
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if(movieIndex === -1) return false 

        movies[movieIndex] = {
            ...movies[movieIndex],
            ...input
        }
    }
}