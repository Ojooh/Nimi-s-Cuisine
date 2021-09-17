const DB = require('./db_controller');
var helper = require("./helper");


//Function To Render Login Page
module.exports.getHomePage = async (req, res, next) => {
    let param1 = ["*"];
    let param2 = "nav_links";
    let param3 = { "is_active": "1" };
    var sql = DB.generateSelectSQL(param1, param2, param3);
    var Links = await DB.runSQLQuery(sql);

    param1 = ["*"];
    param2 = "sliders";
    param3 = "";
    let param4 = " ORDER BY rank ASC";

    var sql = DB.generateSelectSQL(param1, param2, param3, param4);
    console.log(sql)
    var Sliders = await DB.runSQLQuery(sql);

    param1 = ["*"];
    param2 = "social_links";
    param3 = { "is_active": "1" };
    var sql = DB.generateSelectSQL(param1, param2, param3);
    console.log(sql)
    var SLinks = await DB.runSQLQuery(sql);

    param1 = ["*"];
    param2 = "texts";
    param3 = { "category": "slider" };

    var sql = DB.generateSelectSQL(param1, param2, param3);
    console.log(sql)
    var Texts = await DB.runSQLQuery(sql);
    Txt = ((Texts && Texts.length > 0) ? JSON.parse(Texts[0].texts) : '');

    var context = { sl: SLinks, txt: Txt, lnks: Links, slds: Sliders, actv: 'Home' };
    res.render('nimi/index', context);
};

