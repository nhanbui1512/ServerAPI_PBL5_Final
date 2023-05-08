import isLoginMiddleWare from "./JwtService";
import db from "../models";
let createWarning = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.warnings.create({
                idUser: idUser
            })
            resolve(
                {
                    errCode: 0,
                    message: 'create warning success for isUser' + idUser
                }
            )
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

export default {
    createWarning: createWarning
}