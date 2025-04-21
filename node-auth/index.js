import express from 'express'
import cookieParser from 'cookie-parser'
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
//el middelware para que req.body no sea undefined 
app.use(express.json())
app.use(cookieParser())


//siempre que vayamos a usar un modelo de plantillas tenemos que setearlo en nuestra app
app.set('view engine', 'ejs')

//token 
// 

app.use((req, res, next) => {
    const token = req.cookies?.authToken; 
    //read the content cookie 
    //vamos a poder acceder a esta sesión por cualquier edpoint más adelante 
    req.session = {user: null}

    try{
        const data = jwt.verify(token,process.env.SECRET_JWT_KEY); //veryfy token 
        req.session.user = data; //agregar el usuario decodificado al objeto 'req'
    }catch (err){}

    next();  //-> seguir a la siguiente ruta o middelware 
}) 





app.get('/',(req,res) => {

    const { user } = req.session; //destructuramos el objeto session
    console.log(user)
    res.render('index', {user: user}) //le pasamos el objeto user a la vista
})

// Edpoints

app.post('/login', async (req,res) => {

    const { username, password } = req.body
    try{
        const user = await UserRepository.login({username, password})
        const token = jwt.sign(
            {id: user._id, username:user.username},
            process.env.SECRET_JWT_KEY,
            {
                expiresIn: '1h'
            }
        )
        

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', //usar https en produccion 
            maxAge: 60 * 60 * 1000 //1 hora
        }).send({message: 'login success', user, token})
       console.log('pase la cookie')
    }catch (error){
        console.log(error)
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

app.post('/logout', (req,res) => {

    res
        .clearCookie('authToken')
        .json({message: 'logout success'})
})

app.get('/protected', (req,res) => {
    //get the user for the session 
    const { user} = req.session; 
    if(!user){
        return res.status(403).send({message: 'Unauthorized'})
    }

    res.render('protected', {user: user})
})




app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})
