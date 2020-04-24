import UserDB from "../../../data/userDatabase";

export default class GetUserByIdUC {
    constructor(private database: UserDB) { }

    async execute(id: string) {

        const user = await this.database.getUser(id)

        return { user }
    }
}