import { Request, Response } from "express";
import UserDB from "../../../data/userDatabase";
import ChangePasswordUC from "../../../business/usecases/users/changePasswordUC";

async function changePasswordEndpoint(req:Request, res:Response){
  
    try{
        const db = new UserDB()
        const uc = new ChangePasswordUC(db)

        const data = await uc.execute({
            token: req.headers.Authorization as string,
            currentPassword: req.body.currentPassword,
            newPassword: req.body.newPassword
        })

        res.status(200).send(data)
    } catch (err) {
        res.status(err.code || 400).send(err.message)
    }
}

export default changePasswordEndpoint