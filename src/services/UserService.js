import db from '../models/index';
import bcrypt from 'bcrypt';
import { query } from 'express';
var jwt = require('jsonwebtoken');


const privateKey = 'passrenderjsonwebtoken'
const salt = bcrypt.genSaltSync(10);

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt)
            resolve(hash);
        } catch (error) {
            return reject(error);
        }
    })
}

let generateJWTToken = (id, access, email) => {
    return jwt.sign({
        id: id,
        access: access,
        email: email,
    }, privateKey,
        {
            expiresIn: "7d"
        });
}


let checkLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkEmailExist(email);
            if (isExist) {
                let user = await db.users.findOne({
                    attributes: ['email', 'password', 'id', 'access'],
                    where: {
                        email: email
                    },
                    raw: true
                })
                console.log(user)
                if (user) {
                    let check = await bcrypt.compare(password, user.password);
                    let token = await generateJWTToken(user.id, user.email, password)
                    if (check) {
                        userData.errCode = 0;
                        userData.message = "login success";
                        userData.token = token;
                        userData.idUser = user.id
                    } else {
                        userData.errCode = 3;
                        userData.message = "Password is incorrect, please enter other password!"
                    }
                }
            } else {
                userData.errCode = 2;
                userData.message = 'Email is not exist, please enter other email!';
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let handleGetAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = '';
        try {
            if (userId === 'ALL') {
                user = db.users.findAll({
                    attributes: { exclude: ['password'] }
                })
            }

            if (userId && userId !== 'ALL') {
                user = db.findOne({
                    where: {
                        id: userId
                    },
                    attributes: { exclude: ['password'] }
                })
            }
            resolve(user)
        } catch (error) {
            reject(error);
        }
    })
}

let checkEmailExist = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.users.findOne({
                where: {
                    email: email
                }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleCreateNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmailExist(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'The email is exist, please try other email'
                })
            } else {
                let hashPass = await hashPassword(data.password);
                await db.users.create({
                    email: data.email,
                    password: hashPass,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    roleId: data.roleId,
                    phonenumber: data.phonenumber,
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    message: 'Create user successfuly'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let handleUpdateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errCode: 1,
                    message: 'Missing data, please enter enough it'
                })
            }
            let user = await db.users.findOne({
                where: {
                    id: data.id
                },
                raw: false
            })

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.gender = data.gender;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                if (user.image) {
                    user.image = data.avatar;
                }
                user.phonenumber = data.phonenumber
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update user successfully'
                });
            } else {
                resolve({
                    errCode: 2,
                    message: 'User is not exist, please try'
                });
            }
            resolve()
        } catch (error) {
            reject(error);
        }
    })
}

let handleDeleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                resolve({
                    errCode: 1,
                    message: 'Missing data, please enter enough it'
                })
            }

            let user = await db.users.findOne({
                where: { id: userId },
                raw: false
            })
            if (user) {
                await user.destroy()
                resolve({
                    errCode: 0,
                    message: 'Delete User Successfully'
                });
            } else {
                resolve({
                    errCode: 2,
                    message: 'User is not exist, please try'
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

let handleGetAllCode = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!type) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameter, please enter enough'
                })
            } else {
                let data = await db.allcodes.findAll({
                    where: { type: type }
                })
                console.log("DATA QUERY ", data)
                if (data) {
                    resolve({
                        errCode: 0,
                        message: "OKE",
                        data: data
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: 'Type is not correct, please try again'
                    })
                }
            }
        } catch (error) {
            console.log('Error: ', error);
            reject({
                errCode: -1,
                message: "Error from server"
            })
        }
    })
}

const getUserById = ({idUser}) =>{
    return new Promise( async (resolve,reject) =>{
        try {
            const user = await db.users.findOne({
                where: { id: idUser },
                raw: false
            })
            resolve(user)
        } catch (error) {
           reject(error) 
        }
    })
}

const findByEmail = ({email}) =>{
    return new Promise ( async (resolve , reject) =>{
        try {
            const user = await db.users.findOne({
                where: {email: email},
                raw: true
            })
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

const updateUser = ({phoneNumber, carNumberPlates , old, idUser }) =>{
    return new Promise ( async (resolve , reject) =>{
        try {
            let user = await db.users.findOne({
                where: {
                    id: idUser
                },
                raw: false
            })

            if(user){
                user.cartNumberPlates = carNumberPlates
                user.phoneNumber = phoneNumber
                user.old = old
                await user.save();
                resolve(true)
            }

            else{
                resolve(false)
            }
            
        } catch (error) {
            reject(error)  
        }
    })
}


const changePassword  = ({oldPass, newPass, idUser}) =>{
    return new Promise( async (resolve, reject) =>{
        try {
            const user = await db.users.findOne({
                where: {
                    id: idUser
                },
                raw: false
            })

            if(user){
                let check = await bcrypt.compare(oldPass, user.password);
                
                if(check){
                    hashPassword(newPass)
                        .then(hash =>{
                            user.password = hash
                            user.save()
                            resolve(true)
                        })
                        .catch(err=>{
                            reject(err)
                        })
                }
                else{
                    resolve(false)
                }
            }
            else{
                resolve(false)
            }

            

        } catch (error) {
            reject(error)
        }
    })
}

const createAccount = ({email , password, phoneNumber, carNumberPlates ,old }) => {

    return new Promise ( async(resovle, reject) =>{
        let hashPass = await hashPassword(password);

        try {
            await db.users.create({
                email: email,
                password: hashPass,
                phoneNumber: phoneNumber,
                cartNumberPlates: carNumberPlates,
                old: old,
                access: 0
            })

            resovle(true)
        } catch (error) {
            reject(error)
        }
    })
}
export default {
    createAccount,
    hashPassword,
    changePassword,
    updateUser,
    findByEmail,
    getUserById,
    checkLogin: checkLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleUpdateUser: handleUpdateUser,
    handleDeleteUser: handleDeleteUser,
    handleGetAllCode: handleGetAllCode
}