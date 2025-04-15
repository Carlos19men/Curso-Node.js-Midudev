import DBlocal from 'db-local'
const { Schema } = new DBlocal({path: './db'})
import crypto from 'crypto'

import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './config.js'
import { validatedUser, Validation} from './schemas/user.js'
import { readJSON } from './util.js'
const users = readJSON('./db/User.json')




//esquema de usuario 
const User = Schema('User', {
    _id: {type: String, require: true},
    username: {type: String, require: true},
    password: {type: String, require: true}
})


//creamos una clase para usuarios 
export class UserRepository {
    static async create ({username, password}) {
        //1. validated user 
        const result = validatedUser.safeParse({username: username , password: password})  

        if(result.success){
            // 2. asegurity at user is not exist 
            console.log('date valited')
            const user = User.findOne({username})
            if(user) throw new Error('username already exists')

            const id = crypto.randomUUID()
            const hashedPassword = await bcrypt.hash(password,SALT_ROUNDS)


            User.create({
                _id: id, 
                username,
                password: hashedPassword
            }).save()

            return id
        }
        throw new Error('user not valited')
    }

    static async login ({username, password}) {

        Validation.userName(username)
        Validation.password(password)

        //find the username
        const user = users.find(user => user.username === username)
        if(!user) throw new Error('username dos not exist')

        const isValid = await bcrypt.compare(password,user.password)
        if(!isValid) throw new Error('password is invalid')

        //we not up the private date of the user, we have to quit that password
        const {password: _ , ...publicUser } = user
        return publicUser
    }
}