import AppDataSource from "../../data-source"
import Properties from "../../entities/properties.entity"
import AppError from "../../errors/AppErrors"

const listSchedulesByPropertyService = async (id: string, isAdm: boolean) => {
    if (!isAdm) {
        throw new AppError("Not authorized" ,403)
    }

    const propertyRepository = AppDataSource.getRepository(Properties)

    const propertieSchedulesList = await propertyRepository.findOne({
        where: {
            id
        },
        relations: {
            schedules: true
        }
    })

    if (propertieSchedulesList === null){
        throw new AppError("Propertie not found", 404)
    }

    return propertieSchedulesList
}

export default listSchedulesByPropertyService