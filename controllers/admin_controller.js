const DB = require('./db_controller');
const bcrypt = require('bcrypt');
const moment = require('moment');
var helper = require("./helper");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const img_path = { "events": "public/images/event_files/", "cats": "public/images/cat_files/", "user": "public/images/user_files/", "slider": "public/images/slider/" };
const saltRounds = 10;


//Function To Render Dashboard
module.exports.getDashboard = async (req, res, next) => {
    console.log(req.session.loggedin)
    if (req.session.loggedin) {
        let context = {};
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
};

