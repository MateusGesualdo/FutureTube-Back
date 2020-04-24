import { Request, Response } from "express";
import VideoDB from "../../../data/videoDatabase";
import getAllVideosUC from "../../../business/usecases/videos/getAllVideosUC";

export default async function getAllVideosEndpoint(req: Request, res: Response) {
    try {
        const db = new VideoDB()
        const uc = new getAllVideosUC(db)

        const data = await uc.execute(Number(req.query.page))

        res.status(200).send(data)
    } catch (err) {
        res.status(err.code || 400).send(err.message)
    }
}