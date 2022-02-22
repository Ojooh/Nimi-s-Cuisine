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

    var sql1 = `SELECT * FROM categories WHERE is_active = 1 AND prd_count > 0 limit 4`
    console.log(sql1)
    var Cats = await DB.runSQLQuery(sql1);

    var sql2 = `
                    SELECT products.id, products.prod_id, products.name, products.img, 
                    products.descp, products.price, products.qty, products.qty_name, 
                    products.qty_sold, products.variations, products.discount, 
                    products.category, categories.name AS cat_name, products.created_by, 
                    products.in_stock, products.is_active, products.date_created FROM products  
                    INNER JOIN categories ON products.category = categories.id 
                    WHERE products.is_active = 1 AND products.in_stock > 0 
                    LIMIT 16`
    console.log(sql2)
    var Prds = await DB.runSQLQuery(sql2);

    param1 = ["*"];
    param2 = "testys";
    param3 = { "is_active": "1&", "product": "0" };
    var sql = DB.generateSelectSQL(param1, param2, param3);
    console.log(sql)
    var Testys = await DB.runSQLQuery(sql);
    // console.log(Prds)



    var context = { testys: Testys, prds: Prds, cats: Cats, sl: SLinks, txt: Txt, lnks: Links, slds: Sliders, actv: 'Home' };
    res.render('nimi/index', context);
};

