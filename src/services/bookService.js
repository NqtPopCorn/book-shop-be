import e from "cors";
import db from "../models";
import Sequelize, { or, where } from "sequelize";
require("dotenv").config();
const baseUrl = `http://${process.env.HOSTNAME}/img/`;

let getBookById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let book = await db.books.findOne({
        include: include,
        attributes: attributes,
        where: {
          book_id: id,
        },
      });
      if (book) {
        resolve({ book });
      } else {
        resolve({ book: null });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const getPage = (page, limit, type, query, sort_type) => {
  page = parseInt(page);
  limit = parseInt(limit);
  const Sequelize = db.Sequelize; // Giả sử Sequelize đã được khởi tạo trong db
  let { OrCondition, order } = getCondition(type, query, sort_type);

  return new Promise(async (resolve, reject) => {
    try {
      let books = await db.books.findAll({
        include: include,
        attributes: attributes,
        where: {
          [Sequelize.Op.or]: OrCondition,
        },
        order: order,
      });
      //dm sequelize loi limit co include 1-n n-n
      //tu limit va offset bang code??
      let offset = (page - 1) * limit;
      let num_product = books.length;
      let total_page = Math.ceil(num_product / limit);
      books = books.slice(offset, offset + limit);
      resolve({ books, total_page });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

function getCondition(type, query, sort_type) {
  let OrCondition = [];
  let order = [];
  if (type == "title" || type == "all") {
    OrCondition.push({
      title: {
        [Sequelize.Op.substring]: query,
      },
    });
    order.push(["title", sort_type]);
  }
  if (type == "publisher" || type == "all") {
    OrCondition.push({
      "$publisher.name$": {
        [Sequelize.Op.substring]: query,
      },
    });
    order.push(["publisher", "name", sort_type]);
  }
  if (type == "id" || type == "all") {
    OrCondition.push({
      book_id: {
        [Sequelize.Op.substring]: query,
      },
    });
    order.push(["book_id", sort_type]);
  }
  return { OrCondition, order };
}

let updateBook = (id, updates) => {
  return new Promise(async (resolve, reject) => {
    try {
      let book = await db.books.update(updates, {
        where: { book_id: id },
      });

      if (book) {
        resolve("Update book success");
      } else {
        resolve("Update book failed");
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllReferences = async () => {
  let genres = await db.genres.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  let languages = await db.languages.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  let publishers = await db.publishers.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  let authors = await db.authors.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  let bookstatus = await db.bookstatus.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  let coverformats = await db.coverformats.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  let discounts = await db.bookdiscount.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return {
    genres,
    languages,
    publishers,
    authors,
    bookstatus,
    coverformats,
    discounts,
  };
};

const createBook = async (newBook) => {
  return new Promise(async (resolve, reject) => {
    try {
      let book = await db.books.create(newBook);
      resolve({ book });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getBookById: getBookById,
  getPage: getPage,
  updateBook: updateBook,
  getAllReferences: getAllReferences,
  createBook: createBook,
};

const include = [
  {
    model: db.bookimages,
    as: "image",
    attributes: [
      [
        db.sequelize.fn("CONCAT", baseUrl, db.sequelize.col("image.url")),
        "url",
      ],
      "is_main",
      "bookImage_id",
    ],
    where: { is_main: 1 },
    required: false,
  },
  {
    model: db.bookimages,
    as: "alt_images",
    attributes: [
      [db.sequelize.fn("CONCAT", baseUrl, db.sequelize.col("url")), "url"],
      "is_main",
      "bookImage_id",
    ],
    where: { is_main: 0 },
    required: false,
    separate: true,
  },
  {
    model: db.genres,
    as: "genre",
    attributes: ["name"],
  },
  {
    model: db.languages,
    as: "language",
    attributes: ["language_name", "language_code"],
  },
  {
    model: db.publishers,
    as: "publisher",
    attributes: ["name"],
  },
  {
    model: db.bookdiscount,
    as: "discount",
    attributes: ["discount_value", "discount_type"],
    required: false,
  },
  {
    model: db.authors,
    as: "authors",
    attributes: ["name", "author_id"],
    through: { attributes: [] },
  },
  {
    model: db.bookstatus,
    as: "status",
    attributes: ["status_name"],
  },
  {
    model: db.coverformats,
    as: "coverFormat",
    attributes: ["name"],
  },
  {
    model: db.batches,
    as: "stock",
    attributes: {
      exclude: ["updatedAt"],
    },
    where: {
      quantity: {
        [Sequelize.Op.gt]: 0,
      },
    },
    required: false,
  },
];

const attributes = {
  include: [
    [
      Sequelize.literal(
        "(SELECT SUM(quantity) FROM batches WHERE batches.book_id = books.book_id)"
      ),
      "stock_quantity",
    ],
  ],
  exclude: ["createdAt", "updatedAt"],
};
