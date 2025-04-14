import zod from 'zod'

const nameSchems = zod.string().min(3,'username not be 3 characters long').max(100)
const passwordSchems = zod.string().min(3,'passwrod not be 3 characters long').max(100)

export const validatedUser = zod.object({
    username: nameSchems,
    password: passwordSchems
})