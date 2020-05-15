import { Request, Response } from "express";
import UserDB from "../../../data/userDatabase";
import GetUserByIdUC from "../../../business/usecases/users/getUserByIdUC";

async function getUserByIdEndpoint(req: Request, res: Response) {

    try {
        const db = new UserDB()
        const uc = new GetUserByIdUC(db)

        const user = await uc.execute(req.params.id)

        res
            .status(200)
            .send({user})
    } catch (err) {
        res
            .status(err.code || 400)
            .send({ message: err.message })
    }
}

export default getUserByIdEndpoint