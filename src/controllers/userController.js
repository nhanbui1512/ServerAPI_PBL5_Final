
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
        res.status(500).json({
            errCode: 1,
            message: 'Please enter enough input'
        })
    }

    let userData = await userService.checkLogin(email, password);
    
    if(userData.idUser) {
        req.session.idUser = userData.idUser
    }

    res.status(200).json({
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


export default {
    statisticDay:statisticDay,
    index: index,
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleUpdateUser: handleUpdateUser,
    handleDeleteUser: handleDeleteUser,
}