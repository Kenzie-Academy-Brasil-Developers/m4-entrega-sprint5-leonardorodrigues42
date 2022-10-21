import AppDataSource from "../../data-source"
import User from "../../entities/user.entity"
import AppError from "../../errors/AppErrors"
import { IAuthReq, IUser, IUserRequest } from "../../interfaces/users"

const userDeleteService = async (user: IAuthReq, deleteId: string) => {
    const userRepository = AppDataSource.getRepository(User)

    if (!user.isAdm){
        throw new AppError("Not Authorized", 403)
    }

    const userRequest = await userRepository.findOneBy({id: deleteId})

    if (!userRequest){
        throw new AppError("User not found", 404)
    } else if (!userRequest.isActive) {
        throw new AppError("This user already deleted", 400)
    }

    await userRepository.update(deleteId, {isActive: false})

    return userRequest
}

export default userDeleteService