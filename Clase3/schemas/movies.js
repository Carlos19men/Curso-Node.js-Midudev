
const zod = require('zod')

 /*
        Para validar una nueva pelicula primero 
        hay que crear el esquema de pelicula 
    */

const movieSchema = zod.object({
    title: zod.string({
        invalid_type_error: 'title must be a string',
        required_error: 'title is required'
    }),
    year: zod.number().int().min(1900).max(2022),
    director: zod.string(),
    duration: zod.number().int().positive(),
    rate: zod.number().min(0).max(10),
    poster: zod.string().url({
        message: 'poster must be a valid URL '
    }),
    /*En esta caso el enum especifamos las opciones posibles 
    que se pueden colocar
    */
    genre: zod.array(zod.enum(['Action','Adventure','Comedy','Drama','Fantasy','Horror']),{
        required_error: 'Movie genre is required',
        invalid_type_error: 'Movie genre must be an array of enum'
    })
})

/*
    safeParse nos devuelve un objeto (resuleto) donde nos indica si han habido errores 
    o no al momento de hacer la conversión en un objeto de tipo safeParse
*/
function validateMovie (object) {
    return movieSchema.safeParse(object)
}

module.exports = {
    validateMovie
}