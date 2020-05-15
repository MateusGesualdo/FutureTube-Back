import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

export default class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private birthDate: string,
        private profilePicture: string
    ) { }

    getId = () => this.id
    getName = () => this.name
    getEmail = () => this.email
    getPassword = () => this.password
    getbirthDate = () => this.birthDate
    getProfilePicture = () => this.profilePicture

    static generateToken(id: string) {
        try {
            const jwtKey = process.env.JWT_KEY as string
            const token = jwt.sign(
                { id },
                jwtKey,
                { expiresIn: "24h" }
            )
            return token
        } catch(err){
            throw new Error(err.message)
        }
    }

    static getTokenData(token: string) {
        try {
            const jwtKey = process.env.JWT_KEY as string
            const tokenData = jwt.verify(token, jwtKey) as { id: string }
    
            return tokenData
        } catch(err){
            throw new Error("Falha na autenticação: "+err.message)
        }
    }

    static async encryptPassword(password: string) {
        try {
            const rounds = 10
            const hashPassword = await bcrypt.hash(password, rounds)

            return hashPassword
        } catch (err) {
            throw new Error(err.message)
        }

    }

    static async checkPassword(password: string, hashPassword: string) {
        try {
            const passwordIsCorrect = await bcrypt.compare(password, hashPassword)

            return passwordIsCorrect

        } catch (err) {
            throw new Error(err.message)
        }

    }
}
