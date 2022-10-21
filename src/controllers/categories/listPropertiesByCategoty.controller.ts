import { Request, Response } from "express";
import listPropertiesByCategotyService from "../../services/categories/listPropertiesByCategoty.service";

const listPropertiesByCategotyController = async (req: Request, res: Response) => {
    const {id} = req.params

    const list = await listPropertiesByCategotyService(id)

    return res.status(200).json(list)
}

export default listPropertiesByCategotyController