import { Request, Response } from "express";
import VideoDB from "../../../data/videoDatabase";
import EditVideoUC from "../../../business/usecases/videos/editVideoUC";
import DeleteVideoUC from "../../../business/usecases/videos/deleteVideoUC";

export default async function deleteVideoEndpoint(req: Request, res: Response) {
    try {
        const db = new VideoDB()
        const uc = new DeleteVideoUC(db)

        await uc.execute(req.headers.Authorization as string, req.params.videoId)

        res.status(200).send("Vídeo deletado")
    } catch (err) {
        res.status(err.code || 400).send(err.message)
    }
}