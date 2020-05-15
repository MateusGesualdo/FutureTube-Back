import { Request, Response } from "express";
import VideoDB from "../../../data/videoDatabase";
import GetVideoByIdUC from "../../../business/usecases/videos/getVideoByIdUC";

export default async function getVideoByIdEndpoint(req: Request, res: Response) {
    try {
        const db = new VideoDB()
        const uc = new GetVideoByIdUC(db)

        const video = await uc.execute(req.params.id)

        res
            .status(200)
            .send({video})
    } catch (err) {
        res
            .status(err.code || 400)
            .send({ message: err.message })
    }
}