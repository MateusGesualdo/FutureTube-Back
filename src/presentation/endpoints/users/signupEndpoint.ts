import { Request, Response } from "express";
import SignupUC from "../../../business/usecases/users/signupUC";
import UserDB from "../../../data/userDatabase";

async function signupEndpoint(req:Request, res:Response){
  
    try{
        const db = new UserDB()
        const uc = new SignupUC(db)

        const data = await uc.execute({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            birthDate: req.body.birthDate,
            profilePicture: req.body.profilePicture
        })

        res.status(200).send(data)
    } catch (err) {
        res.status(err.code || 400).send(err.message)
    }
}

export default signupEndpoint