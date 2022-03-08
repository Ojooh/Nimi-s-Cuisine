// const User = require('./db_controller');
var helper = require("./helper");
const { v4: uuidv4 } = require('uuid');

module.exports.validSocials = async (req) => {

    if (helper.isEmpty(req.body.name) || (helper.validateName(req.body.name) == false)) {
        return [null, false, { message: 'Social Link Name Input is not Valid' }];
    }
    else if (helper.isEmpty(req.body.link) || (helper.isUrlValid(req.body.link) == false)) {
        return [null, false, { message: 'Social Link Address Input is not Valid' }];
    }
    else {
        var slug = await helper.generateClassName(req.body)
        req.body.name = helper.sentenceCase(req.body.name);
        return [slug, true, { message: req.body.name + ' Social Link Profile Created successfully' }];
    }


};

module.exports.validText = (req,) => {
    let obj = req.body
    console.log(obj)
    let txt = [];
    let s = {};

    Object.keys(obj).forEach(function (key) {
        let j = obj[key];

        if (helper.isEmpty(j) || (helper.validateNamey(j) == false)) {
            return [null, false, { message: 'Slider ' + key + ' Text Not Valid' }];
        } else {
            s[key] = j;

        }
    });

    txt.push(s);
    return [txt, true, { message: ' Slider Landing Text Profile Worked on successfully' }];
};

module.exports.validSlider = (req,) => {

    if (helper.isEmpty(req.body.name) || (helper.validateNamey(req.body.name) == false)) {
        return [null, false, { message: 'Slider Name Input is not Valid' }];
    }
    else if ((req.body.type == "add") && (!req.files && helper.isImage(req.files.img) == false)) {
        return [null, false, { message: 'File Sent is not an Image' }];
    }
    else if ((req.body.type == "add") && (helper.isEmpty(req.body.rank) || (helper.uniqueRank(req.body.rank) == false))) {
        return [null, false, { message: 'Slider Has reached max value, Delete previous slider to add new one' }];
    }
    else {
        req.body.name = helper.sentenceCase(req.body.name);
        return [null, true, { message: req.body.name + ' Slider Profile Created successfully' }];
    }


};

module.exports.validNavLinkName = (req,) => {

    if (helper.isEmpty(req.body.name) || (helper.validateName(req.body.name) == false)) {
        return [null, false, { message: 'Nav Link Name Input is not Valid' }];
    }
    else {
        var slug = req.body.name.toLowerCase();
        return [slug, true, { message: req.body.name + ' Nav Link Profile Created successfully' }];
    }


};

module.exports.validCategory = (req,) => {

    if (helper.isEmpty(req.body.name) || (helper.validateNamey(req.body.name) == false)) {
        return [null, false, { message: 'Category Name Input is not Valid' }];
    }
    else if ((req.files && helper.isImage(req.files.link) == false)) {
        return [null, false, { message: 'File Sent is not an Image' }];
    }
    else {
        req.body.name = helper.sentenceCase(req.body.name);
        let msg = req.body.name + ' Category Profile Created successfully'
        if (req.body.type != "add") {
            msg = req.body.name + ' Category Profile Updated successfully'
        }
        return [null, true, { message: msg }];
    }


};

module.exports.validProduct = async (req) => {
    let cat_id = await helper.validateCategory(req.body.category, req.body.type);
    if (helper.isEmpty(req.body.name) || (helper.validateNamey(req.body.name) == false)) {
        return [null, false, { message: 'Product Name Input is not Valid' }];
    }
    else if ((req.files && helper.isImage(req.files.link) == false)) {
        return [null, false, { message: 'File Sent is not an Image' }];
    }
    else if ((helper.isEmpty(req.body.qty) || helper.validInteger(req.body.qty) == false)) {
        console.log(helper.isImage(req.files.link));
        return [null, false, { message: 'Product Quantity Input is not an Valid' }];
    }
    else if ((helper.isEmpty(req.body.qty_name) || helper.validateName(req.body.qty_name) == false)) {
        return [null, false, { message: 'Product Quantity Name Input is not Valid' }];
    }
    else if ((helper.isEmpty(req.body.qty_price) || helper.validFloat(req.body.price) == false)) {
        return [null, false, { message: 'Product Price Input is not Valid' }];
    }
    else if ((!helper.isEmpty(req.body.discount) && helper.validFloat(req.body.discount) == false)) {
        return [null, false, { message: 'Product Discount Input is not Valid' }];
    }
    else if ((!helper.isEmpty(req.body.variation) && req.body.variation.split(",").length <= 0)) {
        return [null, false, { message: 'Product Variation Input is not Valid, seperate variations with a comma' }];
    }
    else if ((helper.isEmpty(req.body.category) || cat_id == false)) {
        return [null, false, { message: 'Product Category Input is not Valid' }];
    }
    else if ((helper.isEmpty(req.body.desc))) {
        return [null, false, { message: 'Product Description Input is not Valid' }];
    }
    else {
        req.body.name = helper.sentenceCase(req.body.name);
        let msg = req.body.name + ' Product Profile Created successfully'
        if (req.body.type != "add") {
            msg = req.body.name + ' Product Profile Updated successfully'
        }
        let extra = { id: await helper.generateUID("PRD", "products", 4), cat_id: cat_id }
        return [extra, true, { message: msg }];
    }
};

module.exports.validTesty = async (req) => {
    let prd_id = await helper.validateProduct(req.body.product);
    console.log(req.body.product);
    if (helper.isEmpty(req.body.name) || (helper.validateName(req.body.name) == false)) {
        return [null, false, { message: 'Full Name Input is not Valid' }];
    }
    else if ((!helper.isEmpty(req.body.title) && helper.validateName(req.body.title) == false)) {
        return [null, false, { message: 'Proffession Input is not an Valid' }];
    }
    else if ((helper.isEmpty(req.body.msg))) {
        return [null, false, { message: 'Message Input is not Valid' }];
    }
    else if ((helper.isEmpty(req.body.product) || prd_id == false)) {
        return [null, false, { message: 'Testimonial For Input is not Valid' }];
    }
    else {
        req.body.name = helper.sentenceCase(req.body.name);
        req.body.title = helper.sentenceCase(req.body.title);
        let msg = req.body.name + ' Testimonial Created successfully'
        if (req.body.type != "add") {
            msg = req.body.name + ' Testimonial Updated successfully'
        }
        return [{}, true, { message: msg }];
    }
};

module.exports.validPhoto = async (req) => {
    if (helper.isEmpty(req.body.name) || (helper.validateNamey(req.body.name) == false)) {
        return [null, false, { message: 'Photo Text Input is not Valid' }];
    }
    else if ((req.files && helper.isImage(req.files.link) == false)) {
        return [null, false, { message: 'File Sent is not an Image' }];
    }
    else {
        req.body.name = helper.sentenceCase(req.body.name);
        let msg = req.body.name + ' Photo Profile Created successfully'
        if (req.body.type != "add") {
            msg = req.body.name + ' Photo Profile Updated successfully'
        }
        let extra = {}
        return [extra, true, { message: msg }];
    }
};

module.exports.validEvent = async (req) => {
    if (helper.isEmpty(req.body.name) || (helper.validateNamey(req.body.name) == false)) {
        return [null, false, { message: 'Event Title Input is not Valid' }];
    }
    else if ((req.files && helper.isImage(req.files.link) == false)) {
        return [null, false, { message: 'File Sent is not an Image' }];
    }
    else if (helper.isEmpty(req.body.descp)) {
        return [null, false, { message: 'Event Description Input is not Valid' }];
    }

    else {
        req.body.name = helper.sentenceCase(req.body.name);
        let msg = req.body.name + ' Event Profile Created successfully'
        if (req.body.type != "add") {
            msg = req.body.name + ' Event Profile Updated successfully'
        }
        let extra = {}
        return [extra, true, { message: msg }];
    }
};

module.exports.validUser = async (req) => {
    let exist = await helper.emailExist(req.body.email);
    console.log(exist);
    if (helper.isEmpty(req.body.fname) || helper.validateName(req.body.fname) == false) {
        return [null, false, { message: 'Fisrt Name Input is not valid' }];
    }
    else if (helper.isEmpty(req.body.lname) || helper.validateName(req.body.lname) == false) {
        return [null, false, { message: 'Last Name Input is not valid' }];
    }
    else if (helper.isEmpty(req.body.email) || helper.validateEmail(req.body.email) == false) {
        return [null, false, { message: 'Email Input is not valid' }];
    }
    else if (req.body.type == "add" && exist) {
        return [null, false, { message: 'Email Input is not valid, already exist in database' }];
    }
    else if (!helper.isEmpty(req.body.phone) && helper.validateTel(req.body.phone) == false) {
        swalShowError("Phone Number Input is not valid", errorClass);
    }
    else if (helper.isEmpty(req.body.gender)) {
        return [null, false, { message: 'Gender input not valid' }];
    }
    else if (helper.isEmpty(req.body.user_type)) {
        return [null, false, { message: 'User Type input not valid' }];
    }
    else if (req.files && helper.isImage(req.files.link) == false) {
        return [null, false, { message: 'Profile Picture input not valid' }];
    }
    else {
        let uid = "";
        req.body.fname = helper.sentenceCase(req.body.fname);
        req.body.lname = helper.sentenceCase(req.body.lname);
        let msg = req.body.fname + ' User Profile Created successfully'
        if (req.body.type != "add") {
            msg = req.body.fname + ' User Profile Updated successfully'
        } else {
            uid = uuidv4();
            let link = req.get('host') + "/verify/" + uid;
            console.log(link);
            let options = {
                from: "noreply@nimicuisine.com",
                to: req.body.email,
                subject: "Activate your Admin Account",
                html: `<p>You have been registered as an admin for Nimi's cuisine.</p>
                    <br> <br>
                    <p>To activate your account follow this link: <a href="` + link + `">` + link + `</a>
                    and set a Password for your account ` + req.body.email + `</p><br><br>

                    Thank You and Kind regards!<br>
                    From Admin Team Nimi Cuisine`
            }
            await helper.sendMail(options);
        }

        if (req.body.user_type == "SuperAdmin") {
            title = "ADMS"
            category = "admin_user"
        } else if (req.body.user_type == "Admin") {
            title = "ADM"
            category = "admin_user"
        } else {
            title = "CUS"
            category = "cus_user"
        }
        let extra = { id: await helper.generateUID(title, "users", 4), category: category, uid: uid }
        return [extra, true, { message: msg }];
    }
};

