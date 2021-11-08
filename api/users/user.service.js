const pool = require("../../config/database");

module.exports = {
    create: (data, callback) => {
        pool.query(
            `insert into users(firstname, secondname, email, project, passwrd)
                values(?, ?, ?, ?, ?)`,
                [
                    data.firstname,
                    data.secondname,
                    data.email,
                    data.project,
                    data.passwrd
                ],
                (error, results, fields) => {
                    if(error) {
                        return callback(error);
                    }
                    return callback(null, results);
                }
        );
    },
    getUsers: callBack => {
        pool.query(
            `select * from users`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByUserId: (id, callBack) => {
        pool.query(
            `select * from users where id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            `update users set firstname=?, secondname=?, email=?, project=?, passwrd=? where id=?`,
            [
                data.firstname,
                data.secondname,
                data.email,
                data.project,
                data.passwrd,
                data.id
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteUser: (data, callBack) => {
        pool.query(
            'delete from users where id=?',
            [data.id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserByUserEmail: (email, callback) => {
        pool.query(
            `select * from users where email = ?`,
            [email],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    }
};