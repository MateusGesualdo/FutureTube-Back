import UserDB from "../../../data/userDatabase";

export default class GetUserByIdUC {
    constructor(private database: UserDB) { }

    async execute(id: string) {

        const user = await this.database.getUser(id)

        if (!user) throw new Error("Usuário não encontrado")

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            birthDate: user.birth_data,
            profilePicture: user.profile_picture
        }
    }
}