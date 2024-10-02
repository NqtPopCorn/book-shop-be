var DataTypes = require("sequelize").DataTypes;
var _accounts = require("./accounts");
var _authors = require("./authors");
var _billpromotions = require("./billpromotions");
var _bookauthors = require("./bookauthors");
var _bookdiscount = require("./bookdiscount");
var _bookimages = require("./bookimages");
var _books = require("./books");
var _bookstatus = require("./bookstatus");
var _booktranslators = require("./booktranslators");
var _coverformats = require("./coverformats");
var _customers = require("./customers");
var _genres = require("./genres");
var _goodsreceipt = require("./goodsreceipt");
var _goodsreceiptdetails = require("./goodsreceiptdetails");
var _languages = require("./languages");
var _orderdetails = require("./orderdetails");
var _orders = require("./orders");
var _orderstatus = require("./orderstatus");
var _providers = require("./providers");
var _publishers = require("./publishers");
var _roles = require("./roles");
var _translators = require("./translators");

function initModels(sequelize) {
  var accounts = _accounts(sequelize, DataTypes);
  var authors = _authors(sequelize, DataTypes);
  var billpromotions = _billpromotions(sequelize, DataTypes);
  var bookauthors = _bookauthors(sequelize, DataTypes);
  var bookdiscount = _bookdiscount(sequelize, DataTypes);
  var bookimages = _bookimages(sequelize, DataTypes);
  var books = _books(sequelize, DataTypes);
  var bookstatus = _bookstatus(sequelize, DataTypes);
  var booktranslators = _booktranslators(sequelize, DataTypes);
  var coverformats = _coverformats(sequelize, DataTypes);
  var customers = _customers(sequelize, DataTypes);
  var genres = _genres(sequelize, DataTypes);
  var goodsreceipt = _goodsreceipt(sequelize, DataTypes);
  var goodsreceiptdetails = _goodsreceiptdetails(sequelize, DataTypes);
  var languages = _languages(sequelize, DataTypes);
  var orderdetails = _orderdetails(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var orderstatus = _orderstatus(sequelize, DataTypes);
  var providers = _providers(sequelize, DataTypes);
  var publishers = _publishers(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var translators = _translators(sequelize, DataTypes);

  authors.belongsToMany(books, { as: 'book_id_books', through: bookauthors, foreignKey: "author_id", otherKey: "book_id" });
  books.belongsToMany(authors, { as: 'author_id_authors', through: bookauthors, foreignKey: "book_id", otherKey: "author_id" });
  books.belongsToMany(goodsreceipt, { as: 'receipt_id_goodsreceipts', through: goodsreceiptdetails, foreignKey: "book_id", otherKey: "receipt_id" });
  books.belongsToMany(orders, { as: 'order_id_orders', through: orderdetails, foreignKey: "book_id", otherKey: "order_id" });
  goodsreceipt.belongsToMany(books, { as: 'book_id_books_goodsreceiptdetails', through: goodsreceiptdetails, foreignKey: "receipt_id", otherKey: "book_id" });
  orders.belongsToMany(books, { as: 'book_id_books_orderdetails', through: orderdetails, foreignKey: "order_id", otherKey: "book_id" });
  customers.belongsTo(accounts, { as: "account", foreignKey: "account_id"});
  accounts.hasMany(customers, { as: "customers", foreignKey: "account_id"});
  bookauthors.belongsTo(authors, { as: "author", foreignKey: "author_id"});
  authors.hasMany(bookauthors, { as: "bookauthors", foreignKey: "author_id"});
  orders.belongsTo(billpromotions, { as: "billPromotion", foreignKey: "billPromotion_id"});
  billpromotions.hasMany(orders, { as: "orders", foreignKey: "billPromotion_id"});
  books.belongsTo(bookdiscount, { as: "discount", foreignKey: "discount_id"});
  bookdiscount.hasMany(books, { as: "books", foreignKey: "discount_id"});
  orderdetails.belongsTo(bookdiscount, { as: "discount", foreignKey: "discount_id"});
  bookdiscount.hasMany(orderdetails, { as: "orderdetails", foreignKey: "discount_id"});
  bookauthors.belongsTo(books, { as: "book", foreignKey: "book_id"});
  books.hasMany(bookauthors, { as: "bookauthors", foreignKey: "book_id"});
  bookimages.belongsTo(books, { as: "book", foreignKey: "book_id"});
  books.hasMany(bookimages, { as: "bookimages", foreignKey: "book_id"});
  booktranslators.belongsTo(books, { as: "book", foreignKey: "book_id"});
  books.hasMany(booktranslators, { as: "booktranslators", foreignKey: "book_id"});
  goodsreceiptdetails.belongsTo(books, { as: "book", foreignKey: "book_id"});
  books.hasMany(goodsreceiptdetails, { as: "goodsreceiptdetails", foreignKey: "book_id"});
  orderdetails.belongsTo(books, { as: "book", foreignKey: "book_id"});
  books.hasMany(orderdetails, { as: "orderdetails", foreignKey: "book_id"});
  books.belongsTo(bookstatus, { as: "status", foreignKey: "status_id"});
  bookstatus.hasMany(books, { as: "books", foreignKey: "status_id"});
  books.belongsTo(coverformats, { as: "cover_format", foreignKey: "cover_format_id"});
  coverformats.hasMany(books, { as: "books", foreignKey: "cover_format_id"});
  orders.belongsTo(customers, { as: "customer", foreignKey: "customer_id"});
  customers.hasMany(orders, { as: "orders", foreignKey: "customer_id"});
  books.belongsTo(genres, { as: "genre", foreignKey: "genre_id"});
  genres.hasMany(books, { as: "books", foreignKey: "genre_id"});
  genres.belongsTo(genres, { as: "parent", foreignKey: "parent_id"});
  genres.hasMany(genres, { as: "genres", foreignKey: "parent_id"});
  goodsreceiptdetails.belongsTo(goodsreceipt, { as: "receipt", foreignKey: "receipt_id"});
  goodsreceipt.hasMany(goodsreceiptdetails, { as: "goodsreceiptdetails", foreignKey: "receipt_id"});
  books.belongsTo(languages, { as: "language", foreignKey: "language_id"});
  languages.hasMany(books, { as: "books", foreignKey: "language_id"});
  orderdetails.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(orderdetails, { as: "orderdetails", foreignKey: "order_id"});
  orders.belongsTo(orderstatus, { as: "status", foreignKey: "status_id"});
  orderstatus.hasMany(orders, { as: "orders", foreignKey: "status_id"});
  goodsreceipt.belongsTo(providers, { as: "provider", foreignKey: "provider_id"});
  providers.hasMany(goodsreceipt, { as: "goodsreceipts", foreignKey: "provider_id"});
  books.belongsTo(publishers, { as: "publisher", foreignKey: "publisher_id"});
  publishers.hasMany(books, { as: "books", foreignKey: "publisher_id"});
  accounts.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(accounts, { as: "accounts", foreignKey: "role_id"});
  booktranslators.belongsTo(translators, { as: "translator", foreignKey: "translator_id"});
  translators.hasMany(booktranslators, { as: "booktranslators", foreignKey: "translator_id"});

  return {
    accounts,
    authors,
    billpromotions,
    bookauthors,
    bookdiscount,
    bookimages,
    books,
    bookstatus,
    booktranslators,
    coverformats,
    customers,
    genres,
    goodsreceipt,
    goodsreceiptdetails,
    languages,
    orderdetails,
    orders,
    orderstatus,
    providers,
    publishers,
    roles,
    translators,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
