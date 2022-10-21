import { NextFunction, Request, Response } from "express";
import jwt, { decode } from 'jsonwebtoken'

const userAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
    const authToken = req.headers.authorization?.split(" ")[1]

    if (!authToken){
        return res.status(401).json({message: "Invalid token"})
    }

    jwt.verify(authToken, process.env.SECRET_KEY as string, (error, decode: any) => {
        if (error){
            return res.status(401).json({message: "Invalid token"})
        }

        req.user = {
            id: decode.sub,
            isAdm: decode.isAdm
        }
        next()
    })
}

export default userAuthMiddleware