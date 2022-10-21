import { instanceToInstance, instanceToPlain } from 'class-transformer';
import { Response, Request } from 'express';
import userListService from '../../services/users/userList.service';

const userListController = async (req: Request, res: Response) => {
    if (!req.user.isAdm){
        return res.status(403).json({message: "Not authorized"})
    }

    try {
        const users = await userListService()
    
        return res.status(200).json(instanceToInstance(users))
    } catch (error: any) {
        
        return res.status(400).json({message: error.message}) 
    }
}

export default userListController