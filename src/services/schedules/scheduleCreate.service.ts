import AppDataSource from "../../data-source"
import Properties from "../../entities/properties.entity"
import Schedules from "../../entities/schedules.entity"
import AppError from "../../errors/AppErrors"
import { IScheduleRequest } from "../../interfaces/schedules"

const scheduleCreateService = async (body: IScheduleRequest) => {
    const scheduleRepository = AppDataSource.getRepository(Schedules)
    const propertyRepository = AppDataSource.getRepository(Properties)

    const dateString = body.date.split("/")
    const hourString = body.hour.split(":")

    if (parseInt(hourString[0]) < 8 || parseInt(hourString[0]) > 18) {
        throw new AppError("Schedule invalid", 400)
    } else if (parseInt(hourString[0]) === 18 && parseInt(hourString[1]) > 0) {
        throw new AppError("Schedule invalid", 400)
    }

    const property = await propertyRepository.findOneBy({
        id: body.propertyId
    })

    if (!property) {
        throw new AppError("Property nopt found", 404)
    }
    
    const date = new Date(parseInt(dateString[0]), parseInt(dateString[1]) - 1, parseInt(dateString[2]))

    switch (date.getDay()) {
        case 0:
            throw new AppError("Appointments are only allowed from Monday to Friday.")
        case 6:
            throw new AppError("Appointments are only allowed from Monday to Friday.")
    }

    const findSchedules = await scheduleRepository.findOneBy({
        date: dateString.join("-"),
        hour: body.hour
    })

    if (findSchedules){
        throw new AppError("This schedules alrealdy is unavailable", 400)
    }

    const schedule = scheduleRepository.create(body)

    schedule.date = dateString.join("-")
    schedule.user = body.userId
    schedule.property = body.propertyId

    await scheduleRepository.save(schedule)

    return "Appointment made"
}

export default scheduleCreateService