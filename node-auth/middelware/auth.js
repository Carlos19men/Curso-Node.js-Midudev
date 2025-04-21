import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    const token = req.cookies?.authToken; 

    //read the content cookie 

    if(!token){
        const decoded = jwt.verify(token,process)
    }
}