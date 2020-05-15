import { Request, Response } from "express";
import VideoDB from "../../../data/videoDatabase";
import UploadVideoUC from "../../../business/usecases/videos/uploadVideoUC";

export default async function uploadVideoEndpoint(req: Request, res: Response) {
    try {
        const db = new VideoDB()
        const uc = new UploadVideoUC(db)

        await uc.execute({
            token: req.headers.authorization as string,
            title: req.body.title,
            description: req.body.description,
            url: req.body.url
        })

        res
            .status(200)
            .send({ message: "Vídeo criado" })
    } catch (err) {
        res
            .status(err.code || 400)
            .send({ message: err.message })
    }
}