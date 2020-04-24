import UserDB from "../../../data/userDatabase";
import User from "../../entities/user";
import { v4 } from "uuid";

interface SingupUCInput {
    name: string,
    email: string,
    password: string,
    birthDate: string,
    profilePicture: string
}

export default class SignupUC {
    constructor(private database: UserDB) { }

    async execute(input: SingupUCInput) {

        const id = v4()        
        const hashPassword = User.encryptPassword(input.password)

        await this.database.signup(new User(
            id,
            input.name,
            input.email,
            hashPassword,
            input.birthDate,
            input.profilePicture
        ))        

        return {
            message: "Usuário criado!",
            token: User.generateToken(id),
            user:{
                id,
                name: input.name,
                profilePicture: input.profilePicture
            }
        }
    }
}