import { name } from "ejs";
import db from "../models";
import Sequelize, { where } from "sequelize";
require("dotenv").config();
const baseUrl = `http://${process.env.HOSTNAME}/img/`;

let getBookById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let book = await db.books.findOne({
        include: [
          {
            model: db.bookimages,
            as: "image",
            attributes: [
              [
                db.sequelize.fn(
                  "CONCAT",
                  baseUrl,
                  db.sequelize.col("image.url")
                ),
                "url",
              ],
            ],
            where: { is_main: 1 },
          },
          {
            model: db.bookimages,
            as: "alt_images",
            attributes: [
              [
                db.sequelize.fn(
                  "CONCAT",
                  baseUrl,
                  db.sequelize.col("alt_images.url")
                ),
                "url",
              ],
            ],
            where: { is_main: 0 },
          },
        ],
        where: {
          book_id: id,
        },
      });

      if (book) {
        resolve({ book });
      } else {
        resolve({ message: "Book not found" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getPage = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let books = await db.books.findAndCountAll({
        raw: true,
        limit: limit,
        offset: (page - 1) * limit,
      });

      let image = await db.bookimages.findAll({
        raw: true,
        where: { is_main: 1 },
      });

      for (let i = 0; i < books.rows.length; i++) {
        books.rows[i].image = image[i].url;
      }

      if (books) {
        resolve(books);
      } else {
        resolve({ message: "Book not found" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let test = () => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Test function");
      const sequelize = new Sequelize("test", "root", null, {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
        logging: false,
      });
      const Foo = sequelize.define(
        "Foo",
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: Sequelize.STRING,
        },
        {
          tableName: "foo",
          timestamps: false,
        }
      );
      const Bar = sequelize.define(
        "Bar",
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          title: Sequelize.STRING,
          foo_id: Sequelize.INTEGER,
        },
        {
          tableName: "bar",
          timestamps: false,
        }
      );

      Foo.hasMany(Bar, { as: "Bars", foreignKey: "foo_id" });
      let foo1 = await Foo.findOne({
        include: {
          model: Bar,
          as: "Bars",
          attributes: ["title"],
        },
        where: { id: 1 },
      });

      console.log(foo1);
      resolve({ data: await foo1.getBars() });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getBookById: getBookById,
  getPage: getPage,
  test: test,
};
