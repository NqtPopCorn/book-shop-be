<<<<<<< HEAD
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('book_shop', 'root', 'trung2205', {
    host: 'localhost',
    dialect: 'mysql'
=======
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bansach", "root", null, {
  host: "localhost",
  dialect: "mysql",
>>>>>>> 83418f868a4d9a13f807471c60a036d877e08c51
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    let publisher = require("../models/publishers")(sequelize, Sequelize);
    await publisher.sync({ alter: true });
    publisher.create({
      name: "Kim Dong",
      address: "Hanoi",
      status: 1,
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

<<<<<<< HEAD

module.exports = connectDB;
=======
connectDB();

module.exports = connectDB;
>>>>>>> 83418f868a4d9a13f807471c60a036d877e08c51
