import mysql from 'mysql2'
import { require } from '../../utils.js'
const dotenv = require('dotenv')


dotenv.config()

const config = {
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

const connection = mysql.createConnection(config)

export class MovieModel {
    static async getAll({ genre }){
        if(genre){
            const lorwerCaseGenre = genre.toLowerCase()

            //get genre from database table using genre names 
            const result = await connection.promise().query(
                'SELECT BIN_TO_UUID(movies.id), title, year FROM movies RIGHT JOIN genre ON movies.genre = genre.id WHERE name = LOWER(?); ',[lorwerCaseGenre]
            )

            return result; 

        }
        const result = await connection.promise().query(
            'SELECT BIN_TO_UUID(id),title, year, duration, poster,rate,genre  FROM movies;'
        ) 
        return result; 

        

    }

    static async getById({ id }){

        if(id){
            const result = await connection.promise().query(
                'SELECT BIN_TO_UUID(id), title, year, duration, poster, rate, genre FROM movies WHERE BIN_TO_UUID(ID) = ?;',
                [id]
            )
            return result; 
        }
        return ; 
    }

    static async create({ input }){

        //destructure paramas 
        const {title, year,director, duration, poster, rate, genre} = input

        //GET id genre 
        const id_genre = await connection.promise().query(
            'SELECT id FROM genre WHERE name = LOWER(?);',[genre]
        )

        console.log(id_genre)

        if(id_genre.length > 0){
            //insert into movies table
            try{
                const result = await connection.promise().query(
                    'INSERT INTO movies (title,year,director,duration,poster,rate,genre) VALUES (?,?,?,?,?,?,?)',
                    [title, year, director, duration, poster, rate, id_genre[0][0].id]
                )
            }catch {
                return false
            }
            return true
        }
    }
 
    static async delete({ id }){

        const result =  await connection.promise().query(
            'DELETE FROM movies WHERE BIN_TO_UUID(id) = ?;',[id]
        )

        const [rows] = result

        return rows && rows.affectedRows > 0;
    }

    static async update({ id, input }){

        const params = Object.keys(input)

        //filter of the params to evit malicius entrys

        if(params.length > 0){

            console.log(params)
            //struct the argumetns
            var rows = []
            for(let i = 0; i< params.length; i++){
                rows.push(params[i] + ' = ?')
            }

            //group de paramas
            const query_params = rows.join(',')

            const values = [params.map(param => input[param]),id].flat()

            //push the new dates
            try{
                const result = await connection.promise().query(
                    'UPDATE movies SET '+query_params+' WHERE BIN_TO_UUID(id) = ?; ',values
                )
                const [rows] = result
                return rows && rows.affectedRows > 0
            }catch (e){
                console.log(e)
            }
                

        }

  

    }
}