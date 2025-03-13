const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie } = require('./schemas/movies.js')

const app = express() 

//deshabilitar el header X-powerd-BY: Express
app.disable('x-powered-by')

app.use(express.json())


/* 
    Como estamos haciendo un post, recuerden que 
    trabajamos con chunks y que express tiene un 
    middelware para extraer esa informacióin de 
    la request
*/

app.get('/', (req, res) => {
    res.json({message: 'Hello World'})
})

//Todos los rescuros que sean movies se indentifican con /movies
app.get('/movies', (req, res) => {

    const { genre } = req.query

    if(genre){
        const filterMovies = movies.filter(movie => {  
            movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        })

        if(filterMovies) return res.json(filterMovies)
    }


    res.json(movies)
})


//Recuperar la pelicula, por id, (estamos creando un nuevo endpoint)
app.get('/movies/:id',(req, res ) => { //path-to-regexp
    
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
    
    /* 
        Aquí lo que estamos haciendo es extraer
        los datos de la request, en este caso 
        envíada por el usuario 
    
    const {
        title,
        genre,
        year,
        director,
        duration,
        rate,
        poster
    } = req.body 

        Ya con la validación esto no es necesario, solo tenemos que llamar la validación 
        y usarla con el req.body 
    */

   //validamos el req.body 

   const result = validateMovie(req.body)

   if(result.error){
    //se podue usar el 400 o el 422
    return res.status(400).json({
        error: json.parse(result.error.message) 
    })
   }

    /*
        Node.js tiene su propia libreria para 
        generrar id unicos, es nativo y se 
        llama node:crypto  

        tambien funciona en el navegador 
    */

    /**
     * en este caso si podemos usar ...result.data ya 
     * que hemos validado la entrada de datos 
     */
    const newMovie = {
        "id": crypto.randomUUID(), // uuid v4
        ...result.data
    }

    console.log(newMovie)


    /* 
        ESto no es rest porque estamos guardando 
        el estad de la aplicación en memoria 
    */

   movies.push(newMovie)

   res.status(201).json(newMovie)
})

//puerto 
const PORT = process.env.PORT ?? 1234

//Escuchando el puerto 
app.listen(PORT, () => {
    console.log(`Server ins running on port http://localhost:${PORT}`)
})


