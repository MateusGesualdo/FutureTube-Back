import UserDB from "../../../data/userDatabase";
import User from "../../entities/user";

export default class LoginUC {
    constructor(private database: UserDB) { }

    async execute(token?: string,email?: string, password?: string) {
        
        let user

        if(token){
            const id = User.getTokenData(token).id
            
            user = await this.database.getUser(id)

            if (!user) throw new Error("Usuário ou senha incorretos")

        } else {
            if (!email || !password) {
                throw new Error("Dados insuficientes aqui")
            }
    
            user = await this.database.getUser(email)
            
            if (!user) throw new Error("Usuário ou senha incorretos")
            
            const passwordIsCorrect = await User.checkPassword(password, user.password)
    
            if (!passwordIsCorrect) {            
                throw new Error("Usuário ou senha incorretos")
            } 
        }
        
        return{
            message: "Usuário logado",
            token: User.generateToken(user.id),
            user: {
                id: user.id,
                name: user.name,
                profilePicture: user.profile_picture
            }
        }
       
    }
}
