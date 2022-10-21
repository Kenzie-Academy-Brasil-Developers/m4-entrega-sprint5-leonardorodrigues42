import { Request, Response } from "express"
import AppDataSource from "../../data-source"
import User from "../../entities/user.entity"
import userDeleteService from "../../services/users/userDelete.service"

const userDeleteController = async (req: Request, res: Response) => {

    const user = req.user
    const deleteId = req.params.id

    const deletedUser = await userDeleteService(user, deleteId)

    return res.status(204).json(deletedUser)

}

export default userDeleteController