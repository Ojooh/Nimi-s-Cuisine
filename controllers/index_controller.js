const DB = require('./db_controller');
var helper = require("./helper");


//Function To Render Login Page
module.exports.getHomePage = async (req, res, next) => {
    var context = {};
    res.render('nimi/index', context);
};

