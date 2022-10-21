import { Request, Response } from "express";
import User from "../../entities/user.entity";
import { IAuthReq, IUserUpdate } from "../../interfaces/users";
import userPatchService from "../../services/users/userPatch.service";

const userPatchController = async (req: Request, res: Response) => {

        const userRequest: IAuthReq = req.user
        const idForPatch: string = req.params.id
        const data: IUserUpdate = req.body

        const userUpdated = await userPatchService(userRequest, idForPatch, data)

        if (userUpdated instanceof User){
            return res.status(200).json(userUpdated)
        }
        return res.status(userUpdated[1] as number).json({
            message: userUpdated[0]
        })

}

export default userPatchController