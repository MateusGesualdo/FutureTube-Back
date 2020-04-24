import Video from "../../entities/video"
import VideoDB from '../../../data/videoDatabase'
import { v4 } from "uuid"
import User from "../../entities/user"

interface UploadVideoUCInput {
    token: string
    title: string
    description: string
    url: string
}

export default class UploadVideoUC {
    constructor(private database: VideoDB) { }

    async execute(input: UploadVideoUCInput) {

        const id = v4()
        const userId = User.getTokenData(input.token).id

        await this.database.uploadVideo(new Video(
            id,
            input.title,
            input.description,
            input.url,
            userId
        ))
    }
}
