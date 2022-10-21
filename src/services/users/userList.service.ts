import User from '../../entities/user.entity';
import AppDataSource from "../../data-source"

const userListService = async () => {

    try {
        const userRepository = AppDataSource.getRepository(User)
        const users = userRepository.find()
    
        return users
        
    } catch (error: any) {
        throw new Error(error)
    }        
}

export default userListService