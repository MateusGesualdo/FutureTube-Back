import { Request, Response } from "express";
import UserDB from "../../../data/userDatabase";
import LoginUC from "../../../business/usecases/users/loginUC";

async function loginEndpoint(req: Request, res: Response) {

    try {
        const db = new UserDB()
        const uc = new LoginUC(db)

        const data = await uc.execute(
            req.headers.authorization as string,
            req.body.email,
            req.body.password
        )

        res
            .status(200)
            .send(data)
    } catch (err) {
        res
            .status(err.code || 400)
            .send({ message: err.message })
    }
}

export default loginEndpoint