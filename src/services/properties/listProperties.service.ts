import AppDataSource from "../../data-source"
import Properties from "../../entities/properties.entity"

const listPropertiesService = async () => {
    const propertiesRepository = AppDataSource.getRepository(Properties)

    const list = await propertiesRepository.find()

    return list
}

export default listPropertiesService