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
        const jwtKey = process.env.JWT_KEY as string
        const token = jwt.sign(
            { id },
            jwtKey,
            { expiresIn: "24h" }
        )
        return token
    }

    static getTokenData(token: string) {
        const jwtKey = process.env.JWT_KEY as string
        const tokenData = jwt.verify(token, jwtKey) as { id: string }

        return tokenData
    }

    static encryptPassword(password: string) {

        const jwtKey = process.env.JWT_KEY as string
        const token = jwt.sign(
            { password },
            jwtKey,
            { expiresIn: "2400000000000000000000000000000h" }
        )
        return token

    }

    static checkPassword(password: string, hashPassword: string) {

        const jwtKey = process.env.JWT_KEY as string
        const tokenData = jwt.verify(hashPassword, jwtKey) as { password: string }

        return (tokenData.password === password)

    }
}
