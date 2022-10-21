import { Request, Response } from "express";
import categoryCreateService from "../../services/categories/categoryCreate.service";

const categoryCreateController = async (req: Request, res: Response) => {
    const {name} = req.body
    const isAdm = req.user.isAdm

    const category = await categoryCreateService(name, isAdm)

    return res.status(201).json(category)
}

export default categoryCreateController