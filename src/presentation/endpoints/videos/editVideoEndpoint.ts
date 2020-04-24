import { Request, Response } from "express";
import VideoDB from "../../../data/videoDatabase";
import EditVideoUC from "../../../business/usecases/videos/editVideoUC";

export default async function editVideoEndpoint(req: Request, res: Response) {
    try {
        const db = new VideoDB()
        const uc  = new EditVideoUC(db)
        
        await uc.execute({
            token: req.headers.Authorization as string,
            videoId: req.body.videoId,
            newTitle: req.body.newTitle,
            newDescription: req.body.newDescription
        })

        res.status(200).send("Vídeo atualizado")
    } catch (err) {
        res.status(err.code || 400).send(err.message)
    }
}