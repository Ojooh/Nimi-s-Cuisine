const DB = require('./db_controller');
const bcrypt = require('bcrypt');
const moment = require('moment');
var express = require('express');
const session = require('express-session');
const saltRounds = 10;
var app = express();

//Function To Render Login Page
module.exports.loginPage = (req, res, next) => {

    res.render('auth/login');
};

//Function to Handle Login Post
module.exports.logIn = async (req, res, next) => {
    let { username, pass } = req.body
    let param1 = ["*"];
    let param2 = "users";
    let param3 = { "email": username + "/", "user_id": username };
    var sql = DB.generateSelectSQL(param1, param2, param3);
    var User = await DB.runSQLQuery(sql);

    if (User.length > 0 && User[0].is_active == '1') {
        bcrypt.compare(pass, User[0].password, async (err, reslt) => {
            console.log(reslt);
            if (err) {
                res.json({ error: 'Invalid Credentials! Please trys again.' });
            }
            else if (reslt == true) {
                let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                let param1 = "users";
                let param2 = { "last_login": datetime };
                let param3 = { "user_id": User[0].user_id };
                var sql = DB.generateUpdateSQL(param1, param2, param3);
                console.log(sql);
                await DB.runSQLQuery(sql);

                req.session.loggedin = true;
                req.session.username = username;
                req.session.role = User[0].user_type;

                res.json({ success: 'Login Details Correct', url: "/admin", msg: "Valid Credentials" });
            }
            else {
                res.json({ error: 'Invalid Credentials! Please try again.' });
            }
        });


    } else {
        res.json({ error: 'Invalid Credentials! Please try again.' });
    }

}

//Function to Handle Log Out
module.exports.logOut = (req, res, next) => {
    req.session.loggedin = false;
    req.session.username = "";
    req.session.role = "";
    res.redirect("/auth/login");
}