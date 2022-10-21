import { Request, Response } from "express";
import { IScheduleRequest } from "../../interfaces/schedules";
import scheduleCreateService from "../../services/schedules/scheduleCreate.service";

const scheduleCreateController = async (req: Request, res: Response) => {
    const body: IScheduleRequest = req.body

    const schedule = await scheduleCreateService(body)

    return res.status(201).json({message: schedule})
}

export default scheduleCreateController