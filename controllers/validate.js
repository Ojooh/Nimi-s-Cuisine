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
    console.log(req.body)
    console.log(req.query)

    if (helper.isEmpty(req.body.name) || (helper.validateNamey(req.body.name) == false)) {
        return [null, false, { message: 'Category Name Input is not Valid' }];
    }
    else if ((req.files && helper.isImage(req.files.link) == false)) {
        console.log(helper.isImage(req.files.link));
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

