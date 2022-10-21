import { IUser } from './../interfaces/users/index';
import { SchemaOf } from "yup"
import * as yup from "yup"
import { v4 } from "uuid"
import { hashSync } from "bcrypt"
import { NextFunction, Request, Response } from "express"
import AppDataSource from '../data-source';
import User from '../entities/user.entity';

export const userCreateSchema: SchemaOf<IUser> = yup.object().shape({
    id: yup
        .string()
        .transform(() => v4())
        .default(() => v4())
        .notRequired(),

    name: yup.string().required(),

    email: yup.string().email().required(),

    isAdm: yup.bool().required(),

    isActive: 
        yup
        .bool()
        .notRequired(),

    password:
        yup
        .string()
        .transform((pwd) => hashSync(pwd, 10))
        .required(),

    createdAt: 
        yup
        .date()
        .transform(() => new Date())
        .default(() => new Date())
        .notRequired(),

    updatedAt: 
        yup
        .date()
        .transform(() => new Date())
        .default(() => new Date())
        .notRequired()
})

const userCreateValidationMiddleware = (schema: SchemaOf<IUser>) => 
    async (req: Request, res: Response, next: NextFunction) => {

        const userRepository = AppDataSource.getRepository(User)
        const userFind = await userRepository.findOneBy({email: req.body.email})

        if (userFind){
            return res.status(400).json({message: "This user already exists"})
        }

        try {
            const data = req.body
            
                const validateData: IUser = await schema.validate(data, {
                    abortEarly: false,
                    stripUnknown: true
                })
                
                req.newUser = validateData
            
        } catch (error: any) {
            return res.status(400).json({
                error: error.message
            })
        }
        
        next()
}

export default userCreateValidationMiddleware