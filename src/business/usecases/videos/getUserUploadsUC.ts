import VideoDB from '../../../data/videoDatabase'
import User from "../../entities/user"

interface getUserUploadsUCInput {
    token: string
    userId: string
}

export default class getUserUploadsUC {
    constructor(private database: VideoDB) { }

    async execute(input: getUserUploadsUCInput) {

        let userId

        if (input.userId) {
            userId = input.userId
        } else if (input.token) {
            userId = User.getTokenData(input.token).id
        } else {
            throw new Error("Dados insuficientes")
        }

        const videos = await this.database.getUserUploads(userId)

        return { videos }
    }
}

