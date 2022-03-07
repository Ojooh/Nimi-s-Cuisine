const { urlencoded } = require('body-parser');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nimi'
});



con.connect(function (err) {
    if (err) throw err;
});

module.exports.logIn = async (req, res, next) => {
    let { username, pass } = req.body
    var user = await DB.getUserByEmail(email);
    var url = "/login";

    if (user.length > 0 && user[0].is_active == '1') {
        bcrypt.compare(password, user[0].user_pass, async (err, reslt) => {
            if (err) {
                res.json({ error: 'Invalid Credentials! Please trys again.', url: url });
            } else if (reslt == true) {
                let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
                await DB.updateLastLogin(user[0].user_id, datetime);
                if (user[0].user_type == 'ADMS' || user[0].user_type == 'ADM') {
                    url = '/admin';
                    msg = 'Credentials Valid'
                } else {
                    url = '/login';
                    msg = 'Not allowed to view this page';
                }
                req.session.loggedin = true;
                req.session.username = email;
                res.json({ success: 'Login Details Correct', url: url, msg: msg });
            } else {
                res.json({ error: 'Invalid Credentials! Please try again.', url: url });
            }
        });


    } else {
        res.json({ error: 'Invalid Credentials! Please try again.', url: url });
    }

}

module.exports.generateSelectSQL = (param1, param2, param3, param4 = "") => {
    let what = param1.join();
    let from = param2;
    let obj = param3

    if (Object.keys(obj).length > 0) {
        let where = `(`;
        if (obj && obj != "") {
            Object.keys(obj).forEach(function (key) {
                j = obj[key]
                if (key[key.length - 1] == ">") {
                    key = key.slice(0, -1);
                }
                if (j[j.length - 1] == `&`) {
                    const val = j.slice(0, -1)
                    where = where + key + " = '" + val + "') AND (";
                }
                else if (j[j.length - 1] == '/') {
                    const val = j.slice(0, -1)
                    where = where + key + " = '" + val + "') OR (";
                }
                else if (j[j.length - 1] == '&' && j[0] == '!') {
                    const val = j.slice(1, j.length)
                    where = where + key + " != '" + val + "') AND (";
                }
                else if (j[j.length - 1] == '/' && j[0] == '!') {
                    const val = j.slice(1, j.length)

                    where = where + key + " != '" + val + "') OR (";
                }
                else if (j[0] == '!') {

                    const val = j.slice(1, j.length)
                    where = where + key + " != '" + val + "')";
                }
                else {
                    where = where + key + " = '" + j + "')";
                }
            });
        }

        if (obj && obj != "") {

            if (param4 && param4 != "") {
                return "SELECT " + what + " FROM " + from + " WHERE " + where + " " + param4;
            }
            return "SELECT " + what + " FROM " + from + " WHERE " + where;
        }
        else {
            if (param4 && param4 != "") {
                return "SELECT " + what + " FROM " + from + " " + param4;
            }
            return "SELECT " + what + " FROM " + from;
        }
    } else {
        if (param4 && param4 != "") {
            return "SELECT " + what + " FROM " + from + " " + param4;
        }
        return "SELECT " + what + " FROM " + from;
    }
}

module.exports.generateUpdateSQL = (param1, param2, param3) => {
    let from = param1;
    let set = '';
    let obj = param2;
    let where = '(';

    Object.keys(obj).forEach(function (key) {
        j = obj[key];
        set = set + key + ' = "' + j + '",';
    });
    set = set.slice(0, -1);

    Object.keys(param3).forEach(function (key) {
        j = param3[key];
        if (j[j.length - 1] == '&') {
            var val = j.slice(0, -1);
            where = where + key + ' = "' + val + '") AND (';
        }
        else if (j[j.length - 1] == '/') {
            var val = j.slice(0, -1);
            where = where + key + ' = "' + val + '") OR (';
        }
        else {
            where = where + key + ' = "' + j + '")';
        }
    });

    return "UPDATE " + from + " SET " + set + " WHERE " + where;
}

module.exports.generateInsertSQL = (param1, param2, param3) => {
    let from = param1;
    let col = '(';
    let obj = param2;
    let value = '(';

    Object.keys(obj).forEach(function (key) {
        col = col + "`" + key + "`,";
    });
    col = col.slice(0, -1) + ")";

    Object.keys(param3).forEach(function (key) {
        j = param3[key];
        value = value + '"' + j + '", ';
    });

    value = value.slice(0, - 2) + ")";

    return "INSERT INTO " + from + " " + col + " VALUES " + value;
}

module.exports.runSQLQuery = (sql) => {
    const query = sql;
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                resolve(result);
            }

        });
    });
};

module.exports.generateDeleteSQL = (param1, param2,) => {
    let from = param1;
    let obj = param2
    let where = '(';
    if (obj && obj != "") {
        console.log(obj);
        Object.keys(obj).forEach(function (key) {
            j = obj[key]
            console.log(j)
            if (j[j.length - 1] == '&') {
                const val = j.slice(0, -1)
                where = where + key + " = '" + val + "') AND (";
            }
            else if (j[j.length - 1] == '/') {
                const val = j.slice(0, -1)
                where = where + key + " = '" + val + "') OR (";
            }
            else if (j[j.length - 1] == '&' && j[0] == '!') {
                const val = j.slice(1, -1)
                where = where + key + " != '" + val + "') AND (";
            }
            else if (j[j.length - 1] == '/' && j[0] == '!') {
                const val = j.slice(1, -1)
                where = where + key + " != '" + val + "') OR (";
            }
            else if (j[0] == '!') {
                const val = j.slice(1, -1)
                where = where + key + " != '" + val + "')";
            }
            else {
                where = where + key + " = '" + j + "')";
            }
        });
    }

    if (obj && obj != "") {

        return "DELETE FROM " + from + " WHERE " + where;
    }
}







