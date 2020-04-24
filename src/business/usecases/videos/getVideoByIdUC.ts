import VideoDB from '../../../data/videoDatabase'

export default class GetVideoByIdUC {
    constructor(private database: VideoDB) { }

    async execute(id: string) {

        const video = await this.database.getVideoById(id)
        return video
    }
}
