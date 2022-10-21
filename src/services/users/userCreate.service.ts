import { IUser, IUserRequest } from '../../interfaces/users/index';
import AppDataSource from "../../data-source"
import User from "../../entities/user.entity"

const userCreateService = async (data: IUser) => {

    try {
        const userRepository = AppDataSource.getRepository(User)
        
        const newUser = userRepository.create(data)
    
        await userRepository.save(newUser)
    
        return newUser
        
    } catch (error: any) {
        throw new Error(error)
    }
}

export default userCreateService