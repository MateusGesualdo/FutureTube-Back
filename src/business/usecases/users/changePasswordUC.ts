import UserDB from "../../../data/userDatabase";
import User from "../../entities/user";

interface ChangePasswordUCInput {
    token: string,
    currentPassword: string,
    newPassword: string
}

export default class ChangePasswordUC {
    constructor(private database: UserDB) { }

    async execute(input: ChangePasswordUCInput) {

        const userId = User.getTokenData(input.token).id

        const user = await this.database.getUser(userId)

        const passwordIsCorrect = User.checkPassword(input.currentPassword, user.password)

        if (passwordIsCorrect) {
            const hashPassword = User.encryptPassword(input.newPassword)
            await this.database.changePassword(userId, hashPassword)
        } else {
            throw new Error("Senha incorreta")
        }
       
        return {
            message: "Senha alterada",
            token: User.generateToken(userId)
        }
    }
}