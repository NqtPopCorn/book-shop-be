import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models";
require("dotenv").config();

const salt = bcrypt.genSaltSync(10);
const secretKey = process.env.API_SECRET_KEY;

let login = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.accounts.findOne({
                where: { email: email },
            });
            if (user) {
                let check = await bcrypt.compare(password, user.password);
                if (check) {
                    // Generate a JWT token
                    const token = jwt.sign(
                        {
                            account_id: user.account_id,
                            username: user.username,
                        },
                        secretKey,
                        { expiresIn: "1d" }
                    );
                    resolve({
                        status: 200,
                        data: {
                            message: "Login success",
                            account_id: user.account_id,
                            email: user.email,
                            username: user.username,
                            token: token,
                        },
                    });
                } else {
                    resolve({
                        status: 401,
                        data: {
                            message: "Wrong password",
                        },
                    });
                }
            }
            resolve({
                status: 401,
                data: {
                    message: "Username is not exist",
                },
            });
        } catch (error) {
            reject(error);
        }
    });
};

let register = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashedPassword = await hashUserPassword(data.password);
            await db.accounts.create({
                email: data.email,
                password: hashedPassword,
                address: data.address,
                username: data.username,
                phone_number: data.phoneNumber,
            });
            resolve("Create new user success");
        } catch (error) {
            reject(error);
        }
    });
};

let verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            let decoded = jwt.verify(token, secretKey);
            resolve(decoded);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

let createNewUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashedPassword = await hashUserPassword(user.password);
            await db.User.create({
                email: user.email,
                password: hashedPassword,
                firstName: user.firstname,
                lastName: user.lastname,
                address: user.address,
                phoneNumber: user.phonenumber,
                gender: user.gender === "1" ? true : false,
                roleId: user.roleId,
            });
            resolve("Create new user success");
        } catch (error) {
            reject(error);
        }
    });
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hash(password, salt);
            resolve(hash);
        } catch (error) {
            reject(error);
        }
    });
};

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                raw: true,
                where: { id: userId },
            });
            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
        } catch (error) {
            reject(error);
        }
    });
};

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            });
            user.firstName = data.firstname;
            user.lastName = data.lastname;
            user.address = data.address;
            user.phoneNumber = data.phonenumber;
            await user.save();
            let allUser = await db.User.findAll();
            resolve(allUser);
        } catch (error) {
            reject(error);
        }
    });
};

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
            });
            if (user) {
                await user.destroy();
                let allUser = await db.User.findAll();
                resolve(allUser);
            } else {
                resolve("User not found");
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    register,
    login: login,
    createNewUser: createNewUser,
    hashUserPassword: hashUserPassword,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
    verifyToken: verifyToken,
};
