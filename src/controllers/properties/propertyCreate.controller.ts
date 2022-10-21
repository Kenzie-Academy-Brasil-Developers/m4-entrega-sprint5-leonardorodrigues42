import { Request, Response } from "express";
import { IPropertyRequest } from "../../interfaces/properties";
import propertyCreateService from "../../services/properties/propertyCreate.service";

const propertyCreateController = async (req: Request, res: Response) => {
    const body: IPropertyRequest = req.body
    const isAdm: boolean = req.user.isAdm

    const property = await propertyCreateService(body, isAdm)

    return res.status(201).json(property)
}

export default propertyCreateController