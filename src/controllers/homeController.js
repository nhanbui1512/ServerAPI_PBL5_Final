

class homeController {
    index (req,res){
        res.render('home_login.hbs', { layout: false });
    }
}
module.exports = new homeController();