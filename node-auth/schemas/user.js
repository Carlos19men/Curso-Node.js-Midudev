import zod from 'zod'

export const userNameSchem = zod.string().min(3,'username not be 3 characters long').max(100)
export const passwordSchem = zod.string().min(3,'passwrod not be 3 characters long').max(100)

export class Validation {
    static userName (username){
        const result = userNameSchem.safeParse(username)

        if(!result.success) throw Error('Username not valited')
    }

    static password (password){
        const result = passwordSchem.safeParse(password)

        if(!result.success) throw Error('invalid Password')
    }
}


export const validatedUser = zod.object({
    username: userNameSchem,
    password: passwordSchem
})

