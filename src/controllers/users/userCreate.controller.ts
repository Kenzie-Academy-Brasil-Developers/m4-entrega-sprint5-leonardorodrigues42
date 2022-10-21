import { instanceToInstance, instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import userCreateService from "../../services/users/userCreate.service";

const userCreateController = async (req: Request, res: Response) => {

    try {
        const data = req.newUser
    
        const newUser = await userCreateService(data)
    
        return res.status(201).json(instanceToInstance(newUser))
        
    } catch (error: any) {
        return res.status(201).json({message: error.message})
    }
}

export default userCreateController