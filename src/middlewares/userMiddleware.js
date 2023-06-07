const userMiddleware = (req,response,next) =>{

    const idUser = req.session.idUser

    if(idUser)
    {
        next();
    }
    else{
        response.redirect('/')
    }

}

module.exports = userMiddleware