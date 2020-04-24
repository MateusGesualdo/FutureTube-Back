import { Request, Response } from "express";
import VideoDB from "../../../data/videoDatabase";
import getUserUploadsUC from "../../../business/usecases/videos/getUserUploadsUC";

export default async function getUserUploadsEndpoint(req: Request, res: Response) {
    try {
        const db = new VideoDB()
        const uc = new getUserUploadsUC(db)

        const data = await uc.execute({
            token: req.headers.Authorization as string,
            userId: req.query.user as string
        })

        res.status(200).send(data)
    } catch (err) {
        res.status(err.code || 400).send(err.message)
    }
}