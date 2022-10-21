import { Request, Response } from 'express';
import { IUserLogin } from '../../interfaces/users';
import userLoginService from '../../services/users/userLogin.service';

const userLoginController = async (req: Request, res: Response) => {
    try {
        const data: IUserLogin = req.body
        const token = await userLoginService(data)

        return res.status(200).json({token: token})
    } catch (error: any) {
        return res.status(403).json({message: error.message})
    }
}

export default userLoginController