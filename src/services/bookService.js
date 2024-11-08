import { name } from "ejs";
import db from "../models";
import Sequelize, { where } from "sequelize";
import req from "express/lib/request";
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
  page = parseInt(page);
  limit = parseInt(limit);

  return new Promise(async (resolve, reject) => {
    try {
      let books = await db.books.findAll({
        offset: (page - 1) * limit,
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
            required: false,
          },
          {
            model: db.bookdiscount,
            as: "discount",
            attributes: ["discount_value"],
            required: false,
          },
          {
            model: db.genres,
            as: "genre",
            attributes: ["name","parent_id"],
            required: false,
          },
          {
            model: db.languages,
            as: "language",
            attributes: ["language_name"],
            required: false,
          }
        ],
        limit: limit,
      });

      let num_product = await db.books.count();
      let total_page = Math.ceil(num_product / limit);

      if (books) {
        resolve({ books, total_page });
      } else {
        resolve({ message: "Book not found" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getGenres = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let genres = await db.genres.findAll();

      if (genres) {
        // Phân loại danh mục chính và phụ
        let mainCategories = genres.filter(genre => genre.parent_id === null);
        let subCategories = genres.filter(genre => genre.parent_id !== null);

        resolve({ mainCategories, subCategories });
      } else {
        resolve({ message: "Genres not found" });
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
  getGenres: getGenres,
};
