import VideoDB from '../../../data/videoDatabase'

export default class GetVideoByIdUC {
    constructor(private database: VideoDB) { }

    execute = async (id: string) => await this.database.getVideoById(id) || []
}
