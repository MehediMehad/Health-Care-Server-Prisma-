import { Request, Response } from "express";
import { userServices } from "./user.sevice";

const createAdmin  = async (req: Request, res:Response) => {
    
    const result = await userServices.createAdmin(req.body)
    res.send(result)
}


export const userControllers = {
    createAdmin
}