import AppDataSource from "../../data-source"
import Categories from "../../entities/categories.entity"

const listCategoriesService = async () => {
    const categoryRepository = AppDataSource.getRepository(Categories)

    const list = await categoryRepository.find()

    return list
}

export default listCategoriesService