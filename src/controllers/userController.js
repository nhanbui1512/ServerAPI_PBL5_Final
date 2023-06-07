
import { response } from 'express'
import userService from '../services/UserService'
import warningService from '../services/warningService'



let index =  (req,response) => {

    const idUser = req.session.idUser 

    
    warningService.getWarningByUser({idUser})
        .then(res=>{
            res.map((item) =>{
                const date = new Date(String(item.createdAt));
                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                item.createAt = formattedDate
            })
            response.render('user/dashboard.hbs', { layout: 'userLayout.hbs', data: res});
        })
        .catch(err=>{
            response.send('error')
            console.log(err)
        })
    

}


let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Please enter enough input'
        })
    }

    let userData = await userService.checkLogin(email, password);
    
    if(userData.idUser) {
        req.session.idUser = userData.idUser
    }
  
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        token: userData.token
    })
}


let handleGetAllUser = async (req, res) => {
    let userId = req.query.id;

    if (!userId) {
        res.status(500).json({
            errCode: 1,
            message: 'Missing parameter, pleas enter ID'
        })
    }

    let user = await userService.handleGetAllUser(userId)

    res.status(200).json({
        errCode: 0,
        message: 'Success',
        userData: user
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.handleCreateNewUser(req.body);
    res.status(200).json(message)

}

let handleUpdateUser = async (req, res) => {
    let message = await userService.handleUpdateUser(req.body);
    res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    let message = await userService.handleDeleteUser(req.query.id);
    res.status(200).json(message);
}

let statisticDay= async (req,response) =>{
    response.render('user/chart.hbs', {layout: 'userLayout.hbs'})
}

// get /user/password

const passwordPage = (req,response) =>{
    response.render('user/changePassword.hbs', {layout: 'userLayout.hbs'})
}


// post /user/changepassword
const changePassword = (req,response) => {

    var oldPassWord = req.body.oldpass
    var newPassWord = req.body.newpass

    const idUser = req.session.idUser

    userService.changePassword({oldPass: oldPassWord, newPass: newPassWord, idUser})
        .then(res=>{
            if(res == true){
                response.status(200).json({result: true , message: 'change password successful'})
            }
            else{
                response.status(200).json({result: false , message: 'change password unsuccessful'})

            }
        })
        .catch(err=>{
            console.log(err)
            response.status(500).json({result: false , message: 'server is error'})
        })
 

}
// get /user/profile
let profile =  (req,response) =>{

    const idUser = req.session.idUser
    userService.getUserById({idUser})
        .then(data => {
            const user = {
                idUser: data.dataValues.id,
                email: data.dataValues.email,
                old: data.dataValues.old, 
                name: data.dataValues.name,
                phoneNumber: data.dataValues.phoneNumber,
                carNumberPlates: data.dataValues.cartNumberPlates,
                access: data.dataValues.access,
                createdAt: data.dataValues.createdAt,

            }
            response.render('user/profile.hbs', {layout: 'userLayout.hbs',user:user})
        })
        .catch(err=>{
            console.log(err)
            response.send('server is error')
        })

}

// get /user/logout
const logOut = (req,response) =>{
    req.session.destroy();
    response.redirect('/')
}

// post /user/changeprofile
const changeprofile = async (req,response) =>
{
    const idUser = req.session.idUser
    const phoneNumber = req.body.phoneNumber
    const carNumberPlates = req.body.carNumberPlates
    const old = req.body.old

    userService.updateUser({phoneNumber, carNumberPlates, old, idUser})
        .then( () => {
            response.redirect('/user/profile')
        })
        .catch(err =>{
            console.log(err)
            response.send('server is error')
        })

}
export default {
    changePassword,
    passwordPage,
    changeprofile,
    logOut,
    profile,
    statisticDay:statisticDay,
    index: index,
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleUpdateUser: handleUpdateUser,
    handleDeleteUser: handleDeleteUser,
}