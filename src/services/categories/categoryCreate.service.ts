import AppDataSource from "../../data-source"
import Categories from "../../entities/categories.entity"
import AppError from "../../errors/AppErrors"

const categoryCreateService = async (name: string, isAdm: boolean) => {
    const categoryRepository = AppDataSource.getRepository(Categories)

    if (!isAdm) {
        throw new AppError("Not Authotized", 403)
    }

    const findCategory = await categoryRepository.findOneBy({name})

    if (findCategory) {
        throw new AppError("This category already exists", 400)
    } 

    const category = categoryRepository.create({name})

    await categoryRepository.save(category)

    return category
}

export default categoryCreateService