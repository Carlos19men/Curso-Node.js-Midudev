import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
//el middelware para que req.body no sea undefined 
app.use(express.json())

//siempre que vayamos a usar un modelo de plantillas tenemos que setearlo en nuestra app
app.set('view engine', 'ejs')

app.get('/',(req,res) => {
    res.render('index')
})

// Edpoints

app.post('/login', async (req,res) => {

    const { username, password } = req.body
    try{

        const user = await UserRepository.login({username, password})
        /*const token = jwt.sing({id: user._id, username:user.username},process.env.SECRET_JWT_KEY,
            {
                expiresIn: '1h'
            }
        )*/
        console.log(user)
        res.send({user})
    }catch (error){
        console.log(error.menssage)
        res.status(401).send(error)
    }
})


app.post('/register', async (req,res) => {
    //en condiciones normales se deben validar la entrada de la requuest 
    const { username, password } = req.body
    console.log(req.body)

    try{
        const id = await UserRepository.create({username,password})
        res.send({ id })
    }catch (error) {
        //Normalmente no es buena idea enviar el error como respuesta!
        res.status(400).send(error.message)
    }

})
app.post('/logout', (req,res) => {})

app.get('/protected', (req,res) => {})


app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})