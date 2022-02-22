
var nameRegex = /^[A-Za-z.\s_-]*$/;
var nameyRegex = /^[A-Za-z0-9.\s,_-]*$/;
var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
var telRegex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
var passRegex = /^([a-z0-9]).{6,}$/;
const DB = require('./db_controller.js');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'davidmatthew708@gmail.com',
        pass: 'jehovaheloini'
    }
});

module.exports.sendMail = (options) => {
    transporter.sendMail(options, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports.array_unique = (inputArr) => {
    let key = ''
    const tmpArr2 = {}
    let val = ''
    const _arraySearch = function (needle, haystack) {
        let fkey = ''
        for (fkey in haystack) {
            if (haystack.hasOwnProperty(fkey)) {
                if ((haystack[fkey] + '') === (needle + '')) {
                    return fkey
                }
            }
        }
        return false
    }
    for (key in inputArr) {
        if (inputArr.hasOwnProperty(key)) {
            val = inputArr[key]
            if (_arraySearch(val, tmpArr2) === false) {
                tmpArr2[key] = val
            }
        }
    }
    return tmpArr2
};

module.exports.getRank = async () => {
    var letters = ["A", "B", "C", "D", "E"];
    let param1 = ["*"];
    let param2 = "sliders";
    let param3 = "";
    let param4 = " ORDER BY rank DESC LIMIT 1";

    var sql = DB.generateSelectSQL(param1, param2, param3, param4);
    var slds = await DB.runSQLQuery(sql);
    if (slds && slds.length > 0) {
        let indx = letters.indexOf(slds[0].rank.trim());

        if (indx <= letters.length) {
            return letters[indx + 1];
        } else {
            return "";
        }
    } else {
        return "";
    }
};

//Is Any Input Empty
module.exports.isEmpty = (input) => {
    if (input == "") {
        return true;
    } else {
        return false;
    }
};

//Is Name Input Valid
module.exports.validateName = (name) => {
    var bul = nameRegex.test(name);
    return bul;
};

//Is Name Input Valid with number
module.exports.validateNamey = (name) => {
    var bul = nameyRegex.test(name);
    return bul;
};

//Is Email Input Valid
module.exports.validateEmail = (email) => {
    var bul = emailRegex.test(email);
    console.log(bul);
    return bul;
};

//Is Telephone Input Valid
module.exports.validateTel = (tel) => {
    var bul = telRegex.test(tel);
    return bul;
};

//Is Password Input Valid
module.exports.validatePass = (password) => {
    var bul = passRegex.test(password);
    return bul;
};

//Is dob Input Valid
module.exports.validateAge = (dob) => {
    var d = new Date();
    var date_divide = dob.split("-");
    var user_year = date_divide[0];
    var current_year = d.getFullYear();
    var new_age = parseInt(current_year) - parseInt(user_year);

    if (new_age > 18) {
        return false;
    } else {
        return true
    }
};


//Is Email Input Exist
module.exports.emailExist = async (email) => {
    let param1 = ["*"];
    let param2 = "users";
    let param3 = { "email": email };
    var sql = DB.generateSelectSQL(param1, param2, param3);
    var user_e = await DB.runSQLQuery(sql);
    // console.log("helpey");
    // console.log(user_e)
    if (user_e.length > 0) {
        // console.log("helper" + true);
        return true
    } else {
        // console.log("helper" + false);
        return false
    }

};

module.exports.uniqueRank = async (rank) => {
    let param1 = ["*"];
    let param2 = "sliders";
    let param3 = { "rank": rank };
    var sql = DB.generateSelectSQL(param1, param2, param3);
    var rank_e = await DB.runSQLQuery(sql);

    if (rank_e.length > 0) {
        return true;
    } else {
        return false;
    }

}

module.exports.getLastId = async (table) => {
    let param1 = ["id"];
    let param2 = table;
    let param3 = "";
    let param4 = "ORDER BY id DESC LIMIT 1"
    var sql = DB.generateSelectSQL(param1, param2, param3, param4);
    console.log(sql);
    var last = await DB.runSQLQuery(sql);

    if (last.length > 0) {
        return last[0].id
    } else {
        return 0;
    }
}


//generate uid
module.exports.generateUID = async (title, table, width) => {
    var id = await this.getLastId(table);
    let n = (id + 1).toString() + '';
    n = n.toString();
    pad_id = n.length >= width ? n : new Array(width - n.length + 1).join(0) + n;
    return title + "-" + pad_id;

}


//Generate User Type
module.exports.generateUserType = (title) => {
    if (title == 'ADMS') {
        return "Super Admin";
    } else if (title == 'ADM') {
        return "Administrator Editor";
    } else if (title == 'KDS') {
        return "Kid"
    } else if (title == 'SPN') {
        return 'Sponsor';
    } else if (title == 'ENV') {
        return 'Envoy';
    }
};

//Is Image
module.exports.isImage = (file) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/webp") {
        return true;
    } else {
        return false;
    }
};

//Is Doc
module.exports.isDoc = (file) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "application/pdf" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        return true;
    } else {
        return false;
    }
};


//function to split Array
module.exports.splitArray = (arr, n) => {
    var run = true;
    var supreme = [];
    var count = arr.length;
    var v = 0
    var f = n

    while (run) {
        var A = [];

        for (var t = v; t < f; t++) {
            A.push(arr[t]);

        }
        if (A.length > 0) {
            supreme.push(A);
        }

        count = count - n;
        v = v + n;

        if (count > n) {
            f = f + n;
        } else {
            f = arr.length;
        }

        if (count < 0) {
            run = false;
        }

    }
    return supreme;
};


// function to paginate Array
module.exports.paginateArray = (rar, n) => {
    if (rar.length > 6) {
        var thedy = this.splitArray(rar, 6);
        return [thedy[n], thedy.length];
    } else if (rar.length > 0 && rar.length < 6) {
        var supreme = [];
        supreme.push(rar);
        return [supreme, 1];
    } else {
        return [rar, -1]
    }
};


module.exports.formatDateR = (date) => {
    var d = new Date(date);
    var yy = d.getFullYear();
    var mm = (parseInt(d.getMonth()) + 1).toString();
    var dd = d.getDate();
    var HH = d.getHours();
    var MM = d.getMinutes();
    var SS = d.getSeconds();
    return yy + "/" + mm + "/" + dd + " " + HH + ":" + MM + ":" + SS;
};


module.exports.isUrlValid = (userInput) => {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (res == null)
        return false;
    else
        return true;
}

module.exports.generateClassName = async (dik) => {
    let name = dik.name.toLowerCase();
    console.log(dik)

    if (!dik.ID && dik.ID === undefined) {
        return "fab fa-" + name;
    } else {
        let param1 = ["*"];
        let param2 = "social_links";
        let param3 = { "id": dik.ID };
        var sql = DB.generateSelectSQL(param1, param2, param3);
        console.log(sql)
        var Links = await DB.runSQLQuery(sql);
        let pre = Links[0].class.split("-")[0];
        console.log(pre)
        return pre + "-" + name;
    }
}

module.exports.sentenceCase = (str) => {
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }
    const str2 = arr.join(" ");
    return str2
}


module.exports.validInteger = (integer) => {
    if (parseInt(integer) == NaN || parseInt(integer) <= 0) {
        return false;
    }
    else {
        return true
    }

}


module.exports.validFloat = (float) => {
    if (parseFloat(float) == NaN || parseFloat(float) < 0) {
        return false;
    }
    else {
        return true
    }

}

module.exports.updateProdCategoryCount = async (side, id) => {
    let param1 = ["id", "prd_count"];
    let param2 = "categories";
    let param3 = { "id": id };
    var sql = DB.generateSelectSQL(param1, param2, param3);
    var c = await DB.runSQLQuery(sql);

    if (side == "positive") {
        param2 = { "prd_count": parseInt(c[0].prd_count) + 1 };
        param1 = "categories";
        param3 = { "id": id };
        sql = DB.generateUpdateSQL(param1, param2, param3);
        await DB.runSQLQuery(sql);
    } else {
        param2 = { "prd_count": parseInt(c[0].prd_count) - 1 };
        param1 = "categories";
        param3 = { "id": id };
        sql = DB.generateUpdateSQL(param1, param2, param3);
        await DB.runSQLQuery(sql);
    }

}

module.exports.validateCategory = async (category, type) => {
    let param1 = ["id", "prd_count"];
    let param2 = "categories";
    let param3 = { "name": category };
    var sql = DB.generateSelectSQL(param1, param2, param3);
    var c = await DB.runSQLQuery(sql);

    if (category.length > 0) {
        return c[0].id;
    } else {
        return false;
    }
}

