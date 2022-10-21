import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppDataSource from '../../data-source';
import User from '../../entities/user.entity';
import { IUserLogin } from '../../interfaces/users/index';


const userLoginService = async ({email, password}: IUserLogin ) => {
    const userRespository = AppDataSource.getRepository(User)

    const user = await userRespository.findOneBy({email: email})

    if(!user){
        throw new Error("Invalid email ou password")
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
        throw new Error("Invalid email ou password")
    }

    const token = jwt.sign({
        isAdm: user.isAdm
    },
    process.env.SECRET_KEY as string,
    {
        expiresIn: '24h',
        subject: user.id
    })

    return token
}

export default userLoginService