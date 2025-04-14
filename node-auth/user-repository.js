import DBlocal from 'db-local'
const { Schema } = new DBlocal({path: './db'})
import crypto from 'crypto'

import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './config.js'
import { validatedUser } from './schemas/user.js'



//esquema de usuario 
const User = Schema('User', {
    _id: {type: String, require: true},
    username: {type: String, require: true},
    password: {type: String, require: true}
})


//creamos una clase para usuarios 
export class UserRepository {
    static create ({username, password}) {
        //1. validated user 
        const result = validatedUser.safeParse({username: username , password: password})  

        if(result.success){
            // 2. asegurity at user is not exist 
            console.log('date valited')
            const user = User.findOne({username})
            if(user) throw new Error('username already exists')

            const id = crypto.randomUUID()
            const hashedPassword = bcrypt.hashSync(password,SALT_ROUNDS)


            User.create({
                _id: id, 
                username,
                password: hashedPassword
            }).save()

            return id
        }
        console.log('no entró')
        
        return Error('user not valited')
    }
    static login ({username, password}) {}
}