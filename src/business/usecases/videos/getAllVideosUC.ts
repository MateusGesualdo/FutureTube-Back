import VideoDB from '../../../data/videoDatabase'

export default class getAllVideosUC {
    constructor(private database: VideoDB) { }

    async execute(page: number = 0) {

        const videos = await this.database.getAllVideos(page)

        return { videos }
    }
}
