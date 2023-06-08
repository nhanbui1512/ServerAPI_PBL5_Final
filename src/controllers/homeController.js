const { default: UserService } = require("../services/UserService");


class homeController {
    // get / 
    index (req,res){
        res.render('home_login.hbs', { layout: false });
    }


    //get /register
    register (req,response){
        response.render('register.hbs', { layout: false });
    }


    // post /signup
    signUp(req,response){


        
        const user = {
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            old: req.body.old,
            carNumber: req.body.carNumber
        }
        console.log(user)

        if(!user.email || !user.password || !user.phoneNumber || !user.carNumber){
            return response.status(400).json({result: false , message: 'All information must be filled in'})
        }


        UserService.findByEmail({email: user.email})
            .then(res => {

                console.log(res)

                if(res){
                    response.status(200).json({result: false, message: 'email already exist'})
                }
                else{
                    UserService.createAccount({
                                email: user.email,
                                    phoneNumber: user.phoneNumber,
                                    carNumberPlates: user.carNumber,
                                    old:user.old,
                                    password: user.password
                                } )
                                .then(res=>{
                                    if(res == true)
                                    {
                                        response.status(200).json({result: true, message: 'sign up successful'})
                                    }
                                    else{
                                        response.status(200).json({result: false , message: 'sign up unsuccessful'})
                                    }
                                })
                                .catch(err =>{
                                    console.log(err)
                                    response.status(500).json({result: false, message: 'server is error '})
                                })
                }
            
            })
            .catch(err => {
                console.log(err)
                response.status(500).json({result: false , message: 'server is error'})
            })

    }
 
}
module.exports = new homeController();