import isLoginMiddleWare from "./JwtService";
import db from "../models";
const { Op,literal  } = require('sequelize');

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

const getWarningByUser = ({idUser}) =>{

    return new Promise( async (resolve,reject) =>{
    
        try{
            const warnings = await db.warnings.findAll({
                where: {
                    idUser: idUser
                }
            })
            resolve(warnings)
        }
        catch (err){
            reject(err)
        }
    })
}

const getWarningByTime = ({idUser, day, month , year}) =>{

    const startDate = new Date(year, month - 1, day); // Lưu ý: Tháng trong JavaScript bắt đầu từ 0 (0 - 11)
    const endDate = new Date(year, month - 1, day + 1);
    return new Promise (async (resolve, reject) => {
        try {
            const warnings = await db.warnings.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: startDate, // Lớn hơn hoặc bằng startDate
                        [Op.lt]: endDate // Nhỏ hơn endDate
                      },
                    idUser: idUser
                }
            })
            resolve(warnings)
        } catch (error) {
            reject(error)
        }
    })


}


const getWarningByYear = ({ year, idUser}) =>{
    return new Promise( async (resolve, reject) =>{
        try {
            
            const startDate = new Date(`${year}-01-01`);
            const endDate = new Date(`${year}-12-31`);

            const records = await db.warnings.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                      },
                      idUser: idUser
                },
              });
            resolve(records)
        } catch (error) {
            reject(error)
        }
    })
}

export default {
    getWarningByYear,
    getWarningByTime,
    getWarningByUser : getWarningByUser,
    createWarning: createWarning
}