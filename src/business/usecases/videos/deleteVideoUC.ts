import VideoDB from '../../../data/videoDatabase'
import User from "../../entities/user"

export default class DeleteVideoUC {
    constructor(private database: VideoDB) { }

    async execute(token: string, videoId: string) {

        if (!token || !videoId) {
            throw new Error("Dados insuficientes")
        }

        const video = await this.database.getVideoById(videoId)

        const userId = User.getTokenData(token).id

        if (video.user_id !== userId) {
            throw new Error("Não é permitido deletar vídeos de outros usuários")
        }

        await this.database.deleteVideo(videoId)
    }
}
