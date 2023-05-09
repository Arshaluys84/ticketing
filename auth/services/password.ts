import { scrypt, randomBytes } from "crypto"
import { promisify } from "util"

const asyncScript = promisify(scrypt)
export class Password {
    static async toHash  (password:string){
        const middle = randomBytes(8).toString("hex")
        const buf = (await asyncScript(password, middle, 64)) as Buffer
                
        return `${buf.toString("hex")}.${middle}`
    }

    static async compare(storedPassword: string, suppliedPassword: string){
        const [hashedPassword, middle] = storedPassword.split(".")
        const buf = (await asyncScript(suppliedPassword, middle, 64)) as Buffer
                
        return buf.toString("hex") === hashedPassword
    }
}