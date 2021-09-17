const DB = require('./db_controller');
const bcrypt = require('bcrypt');
const moment = require('moment');
var vd = require("./validate");
var hp = require("./helper");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
// const img_path = { "events": "public/images/event_files/", "cats": "public/images/cat_files/", "user": "public/images/user_files/", "slider": "public/images/slider/" };
// const saltRounds = 10;



//Function To Render Dashboard
module.exports.getDashboard = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);

        if (User && User.length > 0 && User[0].is_active == '1') {
            const sidebar = { dash: "active", web: "", prd: "", ords: "", pays: "", usrs: "" }
            let context = { user: User[0], sidebar: sidebar };
            res.render('admin/index', context);
            // var email = req.session.username;
            // var user = await DB.getUserByEmail(email);

            // if ((user.length > 0 && user[0].is_active == '1') && (user[0].user_type == "ADMS" || user[0].user_type == "ADM")) {
            //     var get_orders = await DB.getOrders();
            //     var get_cats = await DB.getCategories();
            //     var get_cus = await DB.getCustomers();
            //     var get_events = await DB.getEvents();
            //     var array_dates = [];
            //     var array_sales = [];
            //     var addOrderPayements = [];
            //     var cat_name = [];
            //     var booked_seats = [];
            //     var totals = [];
            //     var response = get_orders;
            //     var timer = 0;
            //     var timer_1 = 0;


            // while (timer < get_orders.length) {
            //     var ret = {};
            //     var net = {};
            //     var order_date = response[timer]["order_date"]

            //     var r = new Date(order_date);
            //     order_date = r.getFullYear() + "-" + String((parseInt(r.getMonth()) + 1)).padStart(2, '0') + "-" + r.getDate();
            //     array_dates.push(order_date);

            //     ret[order_date] = response[timer]["amount"];
            //     array_sales.push(ret);


            //     for (var g = 0; g < array_sales.length; g++) {
            //         for (var i in array_sales[g]) {
            //             var k = i;
            //             var v = array_sales[g][i];
            //         }
            //         prev = net[k];
            //         if (prev != undefined) {
            //             net[k] = prev + parseInt(v);
            //         } else {
            //             net[k] = parseInt(v)
            //         }


            //     }
            //     timer++;


            // }
            // addOrderPayements.push(net);
            // var noRepeatDates = JSON.stringify([helper.array_unique(array_dates)]);


            // while (timer_1 < get_cats.length) {
            //     var categories = get_cats[timer_1];
            //     cat_name.push(categories["cat_name"]);
            //     booked_seats.push(categories["cat_booked_seats"]);
            //     timer_1++;
            // }

            // var color = ["green", "gold", "aqua", "purple", "blue", "red", "cyan", "yellow", "magenta"];

            // // Get total number of seats sold per category
            // var result = await DB.addNumRows();
            // totals.push(result[0]['total_booked_seats']);
            // var facatys = { cat_name: cat_name, booked: booked_seats, color: color, totals: totals };

            // var context = { user: user, isset: "dashboard", facts: facatys, orders: get_orders, cats: get_cats, customers: get_cus, events: get_events, op: JSON.stringify(addOrderPayements), nrp: noRepeatDates };

        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};

//Function To Render NavLinks Page
module.exports.getNavLinks = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);
        if (User && User.length > 0 && User[0].is_active == '1' && (User[0].user_type == "SuperAdmin" || User[0].user_type == "Admin" || User[0].user_type == "AdminEditor")) {
            var icon = "fas fa-link";
            var title = "Navbar Links"
            let param1 = ["*"];
            let param2 = "nav_links";
            let param3 = "";
            var sql = DB.generateSelectSQL(param1, param2, param3);
            console.log(sql)
            var Links = await DB.runSQLQuery(sql);
            param1 = ["*"];
            param2 = "activities";
            param3 = { "is_active": '1&', "category": "nav_link" };
            let param4 = "ORDER BY date_created DESC LIMIT 10";
            var sql = DB.generateSelectSQL(param1, param2, param3, param4);
            console.log(sql);
            var activities = await DB.runSQLQuery(sql);
            const sidebar = { dash: "", web: "active", prd: "", ords: "", pays: "", usrs: "" }
            sidebar.nav_link = "active";
            let context = { links: Links, acts: activities, user: User[0], sidebar: sidebar, icon: icon, title: title };
            res.render('admin/navLink', context);
        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};

//Function To Create New Navlink Profile
module.exports.createNavLinks = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);
        if (User && User.length > 0 && User[0].is_active == '1' && (User[0].user_type == "SuperAdmin" || User[0].user_type == "Admin" || User[0].user_type == "AdminEditor")) {
            var data = {};
            var [blah, state, msg] = vd.validNavLinkName(req);

            if (state) {
                var email = req.session.username;
                let param1 = "nav_links";
                let param2 = { "name": req.body.name, "link": blah, "created_by": User[0].user_id, "category": "nav_link", "is_active": '1' };
                let param3 = param2;
                var sql = DB.generateInsertSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);
                let subj = "Created " + req.body.name + " Nav Link";
                param1 = "activities";
                param2 = { "activity_type": "website_update", "category": "nav_link", "title": subj, "category": "nav_link", "activity_by": User[0].user_id + "_" + User[0].fname + User[0].lname };
                param3 = param2;
                var sql = DB.generateInsertSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);
                data.success = msg.message;
                res.json(data)
            } else {
                data.error = msg.message;
                res.json(data)
            }
        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};

//Function To Update NavLink Status
module.exports.updateNavLinkStatus = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);
        if (User && User.length > 0 && User[0].is_active == '1' && (User[0].user_type == "SuperAdmin" || User[0].user_type == "Admin" || User[0].user_type == "AdminEditor")) {
            var data = {};
            var state = req.body.state;
            var id = req.body.ID;
            var name = req.body.name;
            ; let subj = ""

            if (state && id) {
                let param1 = "nav_links";
                let param2 = { "is_active": state };
                let param3 = { "id": id };
                var sql = DB.generateUpdateSQL(param1, param2, param3);
                console.log(sql)
                var dn = await DB.runSQLQuery(sql);
                console.log(dn);
                if (state == '1') {
                    subj = "Updated " + name + " Nav Link, set to Active";
                } else {
                    subj = "Updated " + name + " Nav Link, set to In-active";
                }
                param1 = "activities";
                param2 = { "activity_type": "website_update", "category": "nav_link", "title": subj, "activity_by": User[0].user_id + "_" + User[0].fname + User[0].lname };
                param3 = param2;
                var sql = DB.generateInsertSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);
                data.success = subj;
                res.json(data)
            } else {
                data.error = "Something Went Wrong, Please Try Again";
                res.json(data)
            }
        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};

//Function To Edit NavLink Profile
module.exports.updateNavLinkProfile = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);
        if (User && User.length > 0 && User[0].is_active == '1' && (User[0].user_type == "SuperAdmin" || User[0].user_type == "Admin" || User[0].user_type == "AdminEditor")) {
            var data = {};
            var [blah, state, msg] = vd.validNavLinkName(req);

            if (state) {
                console.log(req.body)
                var email = req.session.username;
                let param1 = "nav_links";
                let param2 = { "name": req.body.name, "link": blah, "created_by": User[0].user_id, };
                let param3 = { "id": req.body.ID };
                var sql = DB.generateUpdateSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);
                let subj = "Updated " + req.body.name + " Nav Link Profile";
                param1 = "activities";
                param2 = { "activity_type": "website_update", "category": "nav_link", "title": subj, "activity_by": User[0].user_id + "_" + User[0].fname + User[0].lname };
                param3 = param2;
                var sql = DB.generateInsertSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);
                data.success = msg.message;
                res.json(data)
            } else {
                data.error = msg.message;
                res.json(data)
            }
        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};

// Function to create sub NavLinks
module.exports.createSubNavLink = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);
        if (User && User.length > 0 && User[0].is_active == '1' && (User[0].user_type == "SuperAdmin" || User[0].user_type == "Admin" || User[0].user_type == "AdminEditor")) {
            var data = {};
            var [blah, state, msg] = vd.validNavLinkName(req);

            if (state) {
                var email = req.session.username;
                let param1 = "nav_links";
                let param2 = { "name": req.body.name, "link": blah, "created_by": User[0].user_id, "parent": req.body.ID, "is_active": "1" };
                let param3 = param2;
                var sql = DB.generateInsertSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);

                param1 = "nav_links";
                param2 = { "children": "1" };
                param3 = { "id": req.body.ID };
                var sql = DB.generateUpdateSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);

                let subj = "Created " + req.body.name + " Sub Nav Link Profile";
                param1 = "activities";
                param2 = { "activity_type": "website_update", "category": "nav_link", "title": subj, "activity_by": User[0].user_id + "_" + User[0].fname + User[0].lname };
                param3 = param2;
                var sql = DB.generateInsertSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);
                data.success = msg.message;
                res.json(data)
            } else {
                data.error = msg.message;
                res.json(data)
            }
        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};

// Function to destroy NavLinks
module.exports.destroyNavLink = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);
        if (User && User.length > 0 && User[0].is_active == '1' && (User[0].user_type == "SuperAdmin" || User[0].user_type == "Admin" || User[0].user_type == "AdminEditor")) {
            var data = {};
            var id = req.body.ID;
            var name = req.body.name;
            let subj = ""

            if (name && id) {
                let param1 = "nav_links";
                let param2 = { "id": id };

                var sql = DB.generateDeleteSQL(param1, param2);
                console.log(sql)
                var dn = await DB.runSQLQuery(sql);
                console.log(dn);

                subj = "Updated " + name + " Nav Link Profile, Profile Destroyed";

                param1 = "activities";
                param2 = { "activity_type": "website_update", "category": "nav_link", "title": subj, "activity_by": User[0].user_id + "_" + User[0].fname + User[0].lname };
                param3 = param2;
                var sql = DB.generateInsertSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);
                data.success = subj;
                res.json(data)
            } else {
                data.error = "Something Went Wrong, Please Try Again";
                res.json(data)
            }
        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};

//Function To Render NavLinks Page
module.exports.getSliders = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);
        if (User && User.length > 0 && User[0].is_active == '1' && (User[0].user_type == "SuperAdmin" || User[0].user_type == "Admin" || User[0].user_type == "AdminEditor")) {
            var icon = "fas fa-sliders-h";
            var title = "Slider"
            var rank = await hp.getRank();
            console.log(rank);
            let param1 = ["*"];
            let param2 = "sliders";
            let param3 = "";
            let param4 = " ORDER BY rank ASC";

            var sql = DB.generateSelectSQL(param1, param2, param3, param4);
            console.log(sql)
            var Sliders = await DB.runSQLQuery(sql);

            param1 = ["*"];
            param2 = "texts";
            param3 = { "category": "slider" };

            var sql = DB.generateSelectSQL(param1, param2, param3);
            console.log(sql)
            var Texts = await DB.runSQLQuery(sql);

            Txt = ((Texts && Texts.length > 0) ? Texts[0].texts : '');


            param1 = ["*"];
            param2 = "activities";
            param3 = { "is_active": '1&', "category": "slider" };
            param4 = "ORDER BY date_created DESC LIMIT 10";

            var sql = DB.generateSelectSQL(param1, param2, param3, param4);
            console.log(sql);
            var activities = await DB.runSQLQuery(sql);

            const sidebar = { dash: "", web: "active", prd: "", ords: "", pays: "", usrs: "" }
            sidebar.slider = "active";
            let context = { rank: rank, sliders: Sliders, txts: Txt, acts: activities, user: User[0], sidebar: sidebar, icon: icon, title: title };
            res.render('admin/slider', context);
        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};

//Function To Create New Navlink Profile
module.exports.createSlider = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);
        if (User && User.length > 0 && User[0].is_active == '1' && (User[0].user_type == "SuperAdmin" || User[0].user_type == "Admin" || User[0].user_type == "AdminEditor")) {
            var data = {};
            var [blah, state, msg] = vd.validSlider(req);

            if (state) {
                let img = req.files.img;
                let [name, ext] = img.name.split(".");
                let new_name = uuidv4() + "." + ext;
                let dir = "public/img/slider/" + new_name;
                let db_path = "/img/slider/" + new_name;

                let param1 = "sliders";
                let param2 = { "slider": req.body.name, "rank": req.body.rank, "img": db_path, };
                let param3 = param2;
                var sql = DB.generateInsertSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);
                img.mv(dir);

                let subj = "Created " + req.body.name + " Slider";
                param1 = "activities";
                param2 = { "activity_type": "website_update", "title": subj, "category": "slider", "activity_by": User[0].user_id + "_" + User[0].fname + User[0].lname };
                param3 = param2;
                var sql = DB.generateInsertSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);

                data.success = msg.message;
                res.json(data)
            } else {
                data.error = msg.message;
                res.json(data)
            }
        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};

//Function To Create New Navlink Profile
module.exports.updateSlider = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);
        if (User && User.length > 0 && User[0].is_active == '1' && (User[0].user_type == "SuperAdmin" || User[0].user_type == "Admin" || User[0].user_type == "AdminEditor")) {
            var data = {};
            var [blah, state, msg] = vd.validSlider(req);
            var id = req.body.ID;

            if (state) {

                let one = ["img"];
                let two = "sliders";
                let three = { "id": id };
                var sql = DB.generateSelectSQL(one, two, three);
                var sld = await DB.runSQLQuery(sql);
                let db_path = '';
                let dir = '';
                let img = '';

                if (req.files) {
                    let url = path.join(__dirname, '../', 'public') + sld[0].img
                    fs.unlink(url, function (err) {
                        if (err) throw err;
                        // if no error, file has been deleted successfully
                        console.log('File deleted!');
                    });

                    img = req.files.img;
                    let [name, ext] = img.name.split(".");
                    let new_name = uuidv4() + "." + ext;
                    dir = "public/img/slider/" + new_name;
                    db_path = "/img/slider/" + new_name;
                }
                else {

                    db_path = sld[0].img;
                }

                let param1 = "sliders";
                let param2 = { "slider": req.body.name, "img": db_path, };
                let param3 = { "id": id };
                var sql = DB.generateUpdateSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);
                if (req.files) {
                    img.mv(dir);
                }

                let subj = "Updated " + req.body.name + " Slider Profile, Profile Edited";
                param1 = "activities";
                param2 = { "activity_type": "website_update", "title": subj, "category": "slider", "activity_by": User[0].user_id + "_" + User[0].fname + User[0].lname };
                param3 = param2;
                var sql = DB.generateInsertSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);

                data.success = msg.message;
                res.json(data)
            } else {
                data.error = msg.message;
                res.json(data)
            }
        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};

// Function to destroy Slider
module.exports.destroySlider = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);

        if (User && User.length > 0 && User[0].is_active == '1' && (User[0].user_type == "SuperAdmin" || User[0].user_type == "Admin" || User[0].user_type == "AdminEditor")) {
            var data = {};
            var id = req.body.ID;
            var name = req.body.name;
            let subj = ""

            if (name && id) {
                let one = ["img"];
                let two = "sliders";
                let three = { "id": id };
                var sql = DB.generateSelectSQL(one, two, three);
                var sld = await DB.runSQLQuery(sql);

                let param1 = "sliders";
                let param2 = { "id": id };
                var sql = DB.generateDeleteSQL(param1, param2);
                console.log(sql)
                await DB.runSQLQuery(sql);

                let url = path.join(__dirname, '../', 'public') + sld[0].img
                fs.unlink(url, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });

                subj = "Updated " + name + " Slider Profile, Profile Destroyed";
                param1 = "activities";
                param2 = { "activity_type": "website_update", "title": subj, "category": "slider", "activity_by": User[0].user_id + "_" + User[0].fname + User[0].lname };
                param3 = param2;
                var sql = DB.generateInsertSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);

                data.success = subj;
                res.json(data)
            } else {
                data.error = "Something Went Wrong, Please Try Again";
                res.json(data)
            }
        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};

//Function To Create New Navlink Profile
module.exports.landingText = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);

        if (User && User.length > 0 && User[0].is_active == '1' && (User[0].user_type == "SuperAdmin" || User[0].user_type == "Admin" || User[0].user_type == "AdminEditor")) {
            var data = {};
            var [blah, state, msg] = vd.validText(req);
            console.log(blah);

            param1 = ["*"];
            param2 = "texts";
            param3 = { "category": "slider" };
            var sql = DB.generateSelectSQL(param1, param2, param3);
            var Texts = await DB.runSQLQuery(sql);

            if (state) {
                let txt = JSON.stringify(blah)

                if (Texts && Texts.length > 0) {
                    let param1 = "texts";
                    let param2 = { "category": "slider", "texts": txt, "is_active": "1" };
                    let param3 = { "id": Texts[0].id };
                    var sql = DB.generateUpdateSQL(param1, param2, param3);
                    console.log(sql)
                    await DB.runSQLQuery(sql);
                } else {
                    let param1 = "texts";
                    let param2 = { "category": "slider", "texts": txt, "is_active": "1" };
                    let param3 = param2;
                    var sql = DB.generateInsertSQL(param1, param2, param3);
                    console.log(sql)
                    await DB.runSQLQuery(sql);
                }

                let subj = req.body.subj;
                param1 = "activities";
                param2 = { "activity_type": "website_update", "title": subj, "category": "slider", "activity_by": User[0].user_id + "_" + User[0].fname + User[0].lname };
                param3 = param2;
                var sql = DB.generateInsertSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);

                data.success = msg.message;
                res.json(data)
            } else {
                data.error = msg.message;
                res.json(data)
            }
        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};

//Function To Render NavLinks Page
module.exports.getSocialLinks = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);
        if (User && User.length > 0 && User[0].is_active == '1' && (User[0].user_type == "SuperAdmin" || User[0].user_type == "Admin" || User[0].user_type == "AdminEditor")) {
            var icon = "fas fa-share-alt";
            var title = "Social Links"

            let param1 = ["*"];
            let param2 = "social_links";
            let param3 = "";
            var sql = DB.generateSelectSQL(param1, param2, param3);
            console.log(sql)
            var Links = await DB.runSQLQuery(sql);

            param1 = ["*"];
            param2 = "activities";
            param3 = { "is_active": '1&', "category": "soc_link" };
            let param4 = "ORDER BY date_created DESC LIMIT 10";
            var sql = DB.generateSelectSQL(param1, param2, param3, param4);
            var activities = await DB.runSQLQuery(sql);

            const sidebar = { dash: "", web: "active", prd: "", ords: "", pays: "", usrs: "" }
            sidebar.soc_link = "active";
            let context = { links: Links, acts: activities, user: User[0], sidebar: sidebar, icon: icon, title: title };
            res.render('admin/socialLinks', context);
        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};

//Function To Create New Navlink Profile
module.exports.createSocialLink = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);

        if (User && User.length > 0 && User[0].is_active == '1' && (User[0].user_type == "SuperAdmin" || User[0].user_type == "Admin" || User[0].user_type == "AdminEditor")) {
            var data = {};
            var [blah, state, msg] = await vd.validSocials(req);

            if (state) {
                var email = req.session.username;
                let param1 = "social_links";
                let param2 = { "name": req.body.name, "link": req.body.link, "class": blah, "is_active": '1' };
                let param3 = param2;
                var sql = DB.generateInsertSQL(param1, param2, param3);
                await DB.runSQLQuery(sql);

                let subj = "Created " + req.body.name + " Social Link";
                param1 = "activities";
                param2 = { "activity_type": "website_update", "title": subj, "category": "soc_link", "activity_by": User[0].user_id + "_" + User[0].fname + User[0].lname };
                param3 = param2;
                var sql = DB.generateInsertSQL(param1, param2, param3);
                await DB.runSQLQuery(sql);

                data.success = msg.message;
                res.json(data)
            } else {
                data.error = msg.message;
                res.json(data)
            }
        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};

// Function to edit Social Link Profile
module.exports.updateSocialLinkProfile = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);

        if (User && User.length > 0 && User[0].is_active == '1' && (User[0].user_type == "SuperAdmin" || User[0].user_type == "Admin" || User[0].user_type == "AdminEditor")) {
            var data = {};
            var [blah, state, msg] = await vd.validSocials(req);

            if (state) {
                let param1 = "social_links";
                let param2 = { "name": req.body.name, "link": req.body.link, "class": blah };
                let param3 = { "id": req.body.ID };
                var sql = DB.generateUpdateSQL(param1, param2, param3);
                await DB.runSQLQuery(sql);

                let subj = "Updated " + req.body.name + " Social Link Profile";
                param1 = "activities";
                param2 = { "activity_type": "website_update", "category": "soc_link", "title": subj, "activity_by": User[0].user_id + "_" + User[0].fname + User[0].lname };
                param3 = param2;
                var sql = DB.generateInsertSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);
                data.success = msg.message;
                res.json(data)
            } else {
                data.error = msg.message;
                res.json(data)
            }
        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};

// Function to destroy NavLinks
module.exports.destroySocialLink = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);

        if (User && User.length > 0 && User[0].is_active == '1' && (User[0].user_type == "SuperAdmin" || User[0].user_type == "Admin" || User[0].user_type == "AdminEditor")) {
            var data = {};
            var id = req.body.ID;
            var name = req.body.name;
            let subj = ""

            if (name && id) {
                let param1 = "social_links";
                let param2 = { "id": id };

                var sql = DB.generateDeleteSQL(param1, param2);
                await DB.runSQLQuery(sql);

                subj = "Updated " + name + " Social Link Profile, Profile Destroyed";

                param1 = "activities";
                param2 = { "activity_type": "website_update", "category": "soc_link", "title": subj, "activity_by": User[0].user_id + "_" + User[0].fname + User[0].lname };
                param3 = param2;
                var sql = DB.generateInsertSQL(param1, param2, param3);
                console.log(sql)
                await DB.runSQLQuery(sql);
                data.success = subj;
                res.json(data)
            } else {
                data.error = "Something Went Wrong, Please Try Again";
                res.json(data)
            }
        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};


//Function To Render NavLinks Page
module.exports.getTestys = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.username && req.session.loggedin) {
        var email = req.session.username;
        let param1 = ["*"];
        let param2 = "users";
        let param3 = { "email": email + "/", "user_id": email };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        var User = await DB.runSQLQuery(sql);

        if (User && User.length > 0 && User[0].is_active == '1' && (User[0].user_type == "SuperAdmin" || User[0].user_type == "Admin" || User[0].user_type == "AdminEditor")) {
            var icon = "fas fa-users";
            var title = "Testimonials"

            let param1 = ["*"];
            let param2 = "testys";
            let param3 = "";
            var sql = DB.generateSelectSQL(param1, param2, param3);
            console.log(sql)
            var Testys = await DB.runSQLQuery(sql);

            param1 = ["*"];
            param2 = "activities";
            param3 = { "is_active": '1&', "category": "testy" };
            let param4 = "ORDER BY date_created DESC LIMIT 10";
            var sql = DB.generateSelectSQL(param1, param2, param3, param4);
            var activities = await DB.runSQLQuery(sql);

            const sidebar = { dash: "", web: "active", prd: "", ords: "", pays: "", usrs: "" }
            sidebar.testys = "active";
            let context = { testys: Testys, acts: activities, user: User[0], sidebar: sidebar, icon: icon, title: title };
            res.render('admin/testy', context);
        }
        else {
            res.redirect("/auth/login");
        }
    }
    else {
        res.redirect("/auth/login");
    }
};
