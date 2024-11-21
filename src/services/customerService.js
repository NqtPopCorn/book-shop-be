const { where } = require("sequelize");
import bcrypt, { hash } from "bcryptjs";
import db from "../models";
const salt = bcrypt.genSaltSync(10);


const postRegisterCustomerService = async (customerInfo) => {
    try {
        // Kiểm tra email customer có tồn tại ?
        const existingCustomer = await db.customers.findOne({
            where: {
                email: customerInfo.email
            }
        })
        if (existingCustomer) {
            return { error: 4, message: "Email is existed" };
        }
        console.log(">>> test1")
        const transaction = await db.sequelize.transaction();
        // Thực hiện tạo account customer
        const accountCustomer = await db.accounts.create({
            username: customerInfo.firstname,
            password: await hashUserPassword(customerInfo.password),
            email: customerInfo.email,
            phone_number: customerInfo.phone_number,
            role_id: 3, // 3 là của customer
            status: 1,
            last_login: null,
        }, { transaction })
        console.log(">>> test2")

        if (accountCustomer) {
            const customer = await db.customers.create({
                firstName: customerInfo.firstname,
                lastName: customerInfo.lastname,
                email: customerInfo.email,
                phone_number: customerInfo.phone_number,
                account_id: accountCustomer.account_id
            }, { transaction })
        }
        console.log(">>> test3")

        await transaction.commit();
        return { error: 0, message: "Registration successful" };
    } catch (error) {
        // Nếu có lỗi, rollback giao dịch
        await transaction.rollback();
        console.error(">>> Service postRegisterCustomerService Error:", error.message, "\nStack:", error.stack);
        return { error: 3, message: "Data connection failed" };
    }
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

module.exports = {
    postRegisterCustomerService,
}