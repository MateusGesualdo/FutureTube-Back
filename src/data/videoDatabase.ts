import MainDB from "./MainDatabase";
import Video from "../business/entities/video";

export default class VideoDB extends MainDB {
    async getVideoById(id: string) {
        try {
            const result = await this.connection.raw(`SELECT * FROM future_tube_videos WHERE id = "${id}"`)

            return result[0][0]
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }

    async uploadVideo(video: Video) {
        try {
            await this.connection.raw(
                `INSERT into future_tube_videos values(
                    '${video.getId()}',     
                    '${video.getTitle()}',
                    '${video.getDescription()}',
                    '${video.getUrl()}',
                    '${video.getUserId()}'
            )`)
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }

    async getUserUploads(id: string) {
        try {
            const result = await this.connection.raw(
                `SELECT * FROM future_tube_videos WHERE user_id = "${id}"`
            )

            return result[0]
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }

    async editVideo(id: string, newTitle: string, newDescription: string) {

        try {
            await this.connection.raw(`UPDATE future_tube_videos SET title = "${newTitle}" WHERE id = "${id}";`)
            await this.connection.raw(`UPDATE future_tube_videos SET description = "${newDescription}" WHERE id = "${id}";`)
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }

    async deleteVideo(id: string) {

        try {
            await this.connection.raw(`DELETE FROM future_tube_videos WHERE id = "${id}";`)
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }

    async getAllVideos(page: number) {
        const offset = 10 * (page - 1)
        try {
            const result = await this.connection.raw(
                `SELECT id, title, url FROM future_tube_videos 
                LIMIT 10 OFFSET ${offset}`
            )

            return result[0]
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }
}