const { default: UserService } = require("../services/UserService");


class homeController {
    index (req,res){
        res.render('home_login.hbs', { layout: false });
    }

    register (req,response){
        response.render('register.hbs', { layout: false });
    }

    signUp(req,response){
        const user = {
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            old: req.body.old,
            carNumber: req.body.carNumber
        }

        UserService.findByEmail({email: user.email})
            .then(res => {
                console.log(res)
                
            })
            .catch(err => {
                console.log(err)
                response.status(500).json({result: false , message: 'server is error'})
            })

    }
 
}
module.exports = new homeController();