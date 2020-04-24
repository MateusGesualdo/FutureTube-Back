import VideoDB from '../../../data/videoDatabase'
import User from "../../entities/user"

export interface EditVideoUCInput {
    token: string
    videoId: string
    newTitle: string
    newDescription: string
}

export default class EditVideoUC {
    constructor(private database: VideoDB) { }

    async execute(input: EditVideoUCInput) {

        if (!input.token || !input.videoId) {
            throw new Error("Dados insuficientes")
        }

        const video = await this.database.getVideoById(input.videoId)

        const userId = User.getTokenData(input.token).id

        if (video.user_id !== userId) {
            throw new Error("Não é permitido editar vídeos de outros usuários")
        }

        const newTitle = input.newTitle || video.title
        const newDescription = input.newDescription || video.description
        
        await this.database.editVideo(
            input.videoId,
            newTitle,
            newDescription
        )
    }
}
