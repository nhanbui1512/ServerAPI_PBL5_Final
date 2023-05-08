require('dotenv').config();

const jwt = require('jsonwebtoken');

const isLoginMiddleWare = (req, res, next) => {
    console.log('in isloginmiddle')
    const authHeader = req.headers['authorization'];
    console.log(typeof (authHeader))
    let token = authHeader.split(' ')[1]
    console.log('Request-', token)
    if (authHeader) {

        try {
            var decode = jwt.verify(token, process.env.JWT_PASS);
            req.body.id = decode.id;
            req.body.access = decode.access;
            req.body.email = decode.email;
            console.log('Id-', decode.id, '-access-', decode.access, '-email', decode.email)
            next();
        } catch (error) {
            console.log('In error')
            console.log(error);
            res.status(200).json({ result: false, message: 'Can Phai Login' });
            return;
        }
    } else {
        res.status(200).json({ result: false, message: 'Can Phai Login' });
        return;
    }
};

module.exports = isLoginMiddleWare;
