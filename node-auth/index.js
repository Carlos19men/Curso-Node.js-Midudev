import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()
//el middelware para que req.body no sea undefined 
app.use(express.json())


app.get('/',(req,res) => {
    res.send('Hello wordd !!')
})

// Edpoints

app.post('/login', (res,req) => {})


app.post('/register', (req,res) => {

    //en condiciones normales se deben validar la entrada de la requuest 

    const { username, password } = req.body

    try{

        const id = UserRepository.create({username,password})

        res.send({ id })
    }catch (error) {
        //Normalmente no es buena idea enviar el error como respuesta!
        res.status(400).send(error.message)
    }

})
app.post('/logout', (res,req) => {})

app.get('/protected', (res,req) => {})


app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})