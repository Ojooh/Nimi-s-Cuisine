// const User = require('./db_controller');
var helper = require("./helper");

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

