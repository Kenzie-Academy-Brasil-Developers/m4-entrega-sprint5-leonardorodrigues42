import { Request, Response } from "express";
import listSchedulesByPropertyService from "../../services/schedules/listSchedulesByProperty.service";

const listSchedulesByPropertyController = async (req: Request, res: Response) => {
    const id = req.params.id
    const isAdm = req.user.isAdm

    const list = await listSchedulesByPropertyService(id, isAdm)

    return res.status(200).json(list)
}

export default listSchedulesByPropertyController