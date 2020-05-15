import MainDB from './MainDatabase'
import UserGateway from "../business/gateways/userGateway";
import User from "../business/entities/user";

export default class UserDB extends MainDB implements UserGateway {

    async signup(newUser: User) {
        try {
            await this.connection.raw(
                `INSERT INTO future_tube_users values(
                "${newUser.getId()}",
                "${newUser.getName()}",
                "${newUser.getEmail()}",                               
                "${newUser.getbirthDate()}",
                "${newUser.getPassword()}",
                "${newUser.getProfilePicture()}"
            )`
            )
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }

    async getUser(idOrEmail: string) {
        try {
            const query = await this.connection.raw(
                `SELECT * FROM future_tube_users 
                WHERE id = "${idOrEmail}"
                OR email = "${idOrEmail}"`
            )

            return query[0][0]
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }


    async changePassword(userId: string, newPassword: string) {
        try {
            await this.connection.raw(
                `UPDATE future_tube_users 
                SET password = "${newPassword}"
                WHERE id = "${userId}" `
            )
        } catch (err) {
            throw new Error(err.sqlMessage)
        }
    }
}