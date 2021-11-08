const { create, getUsers, getUserByUserId, updateUser, deleteUser, getUserByUserEmail } = require("./user.service");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {

    createUser: async (req, res) => {
        const body = req.body;
        body.passwrd = await bcrypt.hash(body.passwrd, 10);
        create(body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            const token = sign ({result: results}, process.env.SECRET_KEY, {expiresIn: "1h"});
            return res.status(200).json({
                success: 1,
                data: results,
                token: token
            });
        })
    },
    getUserByUserId: (req, res) => {
        const id = req.params.id;

        getUserByUserId(id, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: async (req, res) => {
        const body = req.body;
        body.passwrd = await bcrypt.hash(body.passwrd, 10);

        updateUser(body, (err, results) => {
            if(err) {
                console.log(err);
                return false;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update user"
                });
            }
            return res.json({
                success: 1,
                message: "Updated successfully"
            });
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        console.log(data);
        deleteUser(data, (err, results) => {
            if(err) {
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: "User deleted successfully"
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, async (err, results) => {
            if (err) {
                console.log(err);
            }
            if(!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = await bcrypt.compare(body.passwrd, results.passwrd);
            if(result) {
                // We do not want to pass user password as part of the token
                results.passwrd = undefined;
                const jsontoken = sign ({result: results}, process.env.SECRET_KEY, {expiresIn: "1h"});

                return res.json({
                    success: 1,
                    message: "Login successfully",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    }
}