import AppDataSource from "../../data-source"
import Addresses from "../../entities/addresses.entity"
import Categories from "../../entities/categories.entity"
import Properties from "../../entities/properties.entity"
import AppError from "../../errors/AppErrors"
import { IPropertyRequest } from "../../interfaces/properties"

const propertyCreateService = async (body: IPropertyRequest, isAdm: boolean) => {
    const propertyRepository = AppDataSource.getRepository(Properties)
    const addressRepository = AppDataSource.getRepository(Addresses)
    const categoryRepository = AppDataSource.getRepository(Categories)

    if (!isAdm) {
        throw new AppError("Not authorized", 403)
    }

    const findCategory = await categoryRepository.findOneBy({
        id: body.categoryId
    })

    const findAddress = await addressRepository.findOneBy({
        zipCode: body.address.zipCode,
        number: body.address.number
    })

    if (findAddress){
        throw new AppError("This address already exists")
    }

    if (!findCategory) {
        throw new AppError("Category not found", 404)
    } 

    if (body.address.state.length > 2 || body.address.zipCode.length > 8) {
        throw new AppError("comprimento de state ou zipcode informados é inválid")
    }

    const address = addressRepository.create(body.address)
    await addressRepository.save(address)


    const property = propertyRepository.create(body)
    property.address = address
    property.category = findCategory
    await propertyRepository.save(property)

    return property
}

export default propertyCreateService