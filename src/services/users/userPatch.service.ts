import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import AppError from "../../errors/AppErrors";
import { IAuthReq, IUserUpdate } from "../../interfaces/users";

const userPatchService = async (userRequest: IAuthReq, idForPatch: string, body: IUserUpdate): Promise<User | Array<string | number>> => {
    
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({id: idForPatch})

    if (!user){
        throw new AppError("User not found", 404)
    }
    let updatedUser

    if ("isAdm" in body){
        throw new AppError("The 'isAdm' property cannot be modified", 401)
    } else if ("id" in body){
        throw new AppError("The 'id' property cannot be modified", 401)
    } else if ("isActive" in body){
        throw new AppError("The 'isActive' property cannot be modified", 401)
    }

    const data = {
        email: body.email,
        name: body.name,
        password: body.password
    }


    if (userRequest.id === idForPatch){
        
        await userRepository.update(idForPatch, data)

        updatedUser = await userRepository.findOneBy({id: idForPatch})

        
    } else if (userRequest.isAdm){
        await userRepository.update(idForPatch, data)
        
        updatedUser = await userRepository.findOneBy({id: idForPatch})
    }
    
    return updatedUser as User
}

export default userPatchService