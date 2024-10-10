const bookService = require("../services/bookService");

let handleGetById = async (req, res) => {
  try {
    let id = req.query.id;
    if (!id) {
      return res.status(500).json({
        message: "Missing input parameter",
      });
    }
    let { book } = await bookService.getBookById(id);
    return res.status(200).json({
      message: "Success",
      book: book,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get book failed",
      error: error.message,
    });
  }
};

let handleGetPage = async (req, res) => {
  try {
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let { books, total_page } = await bookService.getPage(page, limit);
    return res.status(200).json({
      message: "Success",
      books: books,
      total_page: total_page,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get book failed",
      error: error.message,
    });
  }
};

let test = async (req, res) => {
  try {
    let { data } = await bookService.test();
    return res.status(200).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get book failed",
      error: error.message,
    });
  }
};

module.exports = {
  handleGetById: handleGetById,
  handleGetPage: handleGetPage,
  test: test,
};
