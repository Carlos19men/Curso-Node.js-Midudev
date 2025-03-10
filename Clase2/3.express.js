//importamos la librería de express
const express = require('express')
const app = express() 

app.disable('x-powered-by')

//especificamos el puerto 
const PORT = process.env.PORT ?? 1234;

//middelwers
app.use((req,res, next) => {
    console.log('mi primer middelwer')

    if(req.method !== 'POST') return next()
    if(req.headers['content-type'] !== 'application/json') return next() 

    /*
        Aquí solo llegan request que son POST y que 
        solo tienen el header Content-type: application/json
    */ 

    //vamos a extraer el body de la request
    let body = ''

    //escuchar el evento data 
    req.on('data',chunck => {
        body += chunck.toString()
    })

    req.on('end',() => {
        const data = JSON.parse(body)
        data.timestap = Date.now()

        //mutar la request y meter la informacióne en el body 
        
        //este objeto es unico para cada petición 
        req.body = data 
        next()
        /*
            Porque hicimos esto? 

            Basicamente si la petición que estamos usando 
            tiene el proceso POST lo unico que estamos haciendo 
            es tomar el body de la petición (data) y guardarlo en 
            la constante req.body para que al momento de evaluar 
            las rutas ya tenemos el body 
        */
    })
})

/*
    Otra forma mucho más resumida de hacer todo este mismo
    proces es 

    app.express(express.json)
*/

//pagina principal 
app.get('/', (req, res) => {
    res.status(200).send('Hola mundo estoy online')
})

//migrando el proceso del fichero anterior 
app.post('/pokemon',(req,res) => {
    //finalizado el evento 
    res.status(201).json(req.body)
})

//pagina del ditto 
app.get('/pokemon/ditto', (req, res) => {
    const dittoJson = require('./pokemon/ditto.json')
    res.status(201).json(dittoJson)
})

//error 404
app.use((req, res) => {
    res.status(404).send('<h1> 404 Eto no funca!</h1>')
})

app.listen(PORT, () => {
    console.log('servidor corriendo en: http://localhost:' + PORT)
})

