const DB = require('./db_controller');
var vd = require("./validate");
const bcrypt = require('bcrypt');
const saltRounds = 10;


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

    param1 = ["*"];
    param2 = "gallery";
    param3 = { "is_active": "1" };
    param4 = "LIMIT 8";
    var sql = DB.generateSelectSQL(param1, param2, param3, param4);
    console.log(sql)
    var Photos = await DB.runSQLQuery(sql);

    param1 = ["*"];
    param2 = "events";
    param3 = { "is_active": "1" };
    param4 = "LIMIT 4";
    var sql = DB.generateSelectSQL(param1, param2, param3, param4);
    console.log(sql)
    var Events = await DB.runSQLQuery(sql);



    var context = {
        evs: Events,
        photos: Photos, testys: Testys, prds: Prds,
        cats: Cats, sl: SLinks, txt: Txt, lnks: Links,
        slds: Sliders, actv: 'Home'
    };
    res.render('nimi/index', context);
};

//Function To Upate Testimonial
module.exports.getShareTesty = async (req, res) => {
    console.log(req.params.id);
    var context = {
        product: req.params.id,
        page: "Share Your Testimonial"
    }
    res.render('nimi/share', context);

};

//Function To Create New Testimonial
module.exports.addTesty = async (req, res, next) => {
    let data = {};
    var [blah, state, msg] = await vd.validTesty(req);

    if (state) {
        let param1 = "testys";
        let param2 = {
            "name": req.body.name, "title": req.body.title,
            "message": req.body.msg, "product": req.body.product,
            "is_active": '0'
        };
        let param3 = param2;
        var sql = DB.generateInsertSQL(param1, param2, param3);
        console.log(sql);
        await DB.runSQLQuery(sql);


        let subj = "Created " + req.body.name + " Testimonial";
        param1 = "activities";
        param2 = { "activity_type": "website_update", "title": subj, "category": "testy", "activity_by": req.body.name };
        param3 = param2;
        var sql = DB.generateInsertSQL(param1, param2, param3);
        await DB.runSQLQuery(sql);

        data.success = msg.message;
        res.json(data)
    } else {
        data.error = msg.message;
        res.json(data)
    }
};

//Function To verify user
module.exports.verifyAdmin = async (req, res) => {
    console.log(req.params.id);

    param1 = ["*"];
    param2 = "users";
    param3 = { "uid": req.params.id };
    var sql = DB.generateSelectSQL(param1, param2, param3);
    console.log(sql)
    var user = await DB.runSQLQuery(sql);

    if (user.length == 1 && user[0].is_active == "0") {
        var context = {
            user: user,
            page: "Verify Account",
        }

    } else {
        var context = {
            error: "Not a valid User",
            page: "Verify Account"
        }
    }

    res.render('nimi/verify', context);


};

// function to activate user account
module.exports.activate = async (req, res, next) => {
    let data = {};
    let passy = "";
    let c;

    param1 = ["*"];
    param2 = "users";
    param3 = { "uid": req.body.uid };
    var sql = DB.generateSelectSQL(param1, param2, param3);
    console.log(sql)
    var user = await DB.runSQLQuery(sql);

    if (user.length == 1 && user[0].is_active == "0") {
        
        await bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            if (!err) {
                passy = hash;
                console.log(passy);
                let param1 = "users";
                let param2 = {
                    "password": passy, "is_active": "1",
                    "uid": ""
                };
                let param3 = { uid: req.body.uid }
                var sql = DB.generateUpdateSQL(param1, param2, param3);
                await DB.runSQLQuery(sql);
            }
        })


        if (user[0].user_type) {
            c = "admin_user"
        } else {
            c = "cus_user"
        }


        let subj = "Activated " + user[0].fname + " Account";
        param1 = "activities";
        param2 = { "activity_type": "user_update", "title": subj, "category": c, "activity_by": user[0].fname };
        param3 = param2;
        var sql = DB.generateInsertSQL(param1, param2, param3);
        await DB.runSQLQuery(sql);

        data.success = "User Account is Activated";
        res.json(data)
    } else {
        data.error = msg.message;
        res.json(data)
    }
};

