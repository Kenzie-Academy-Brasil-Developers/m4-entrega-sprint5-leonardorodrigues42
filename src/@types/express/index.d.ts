import { IUser, IUserRequest } from './../../interfaces/users/index';
import * as express from "express"

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string
                isAdm: boolean
            }
            newUser: IUser
        }
    }
}