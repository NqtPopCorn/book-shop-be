const bookService = require("../services/bookService");
const imageService = require("../services/imageService");

let handleGetById = async (req, res) => {
  try {
    let id = req.params.bookId;
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
    let type = req.query.type || "all";
    let query = req.query.q || "";
    let { books, total_page } = await bookService.getPage(
      page,
      limit,
      type,
      query
    );
    return res.status(200).json({
      message: "Success",
      books: books || [],
      total_page: total_page || 0,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get book failed",
      error: error.message,
    });
  }
};

// xu ly form multipart
let handleUpdate = async (req, res) => {
  try {
    let id = req.params.bookId;
    if (!id) {
      return res.status(500).json({
        message: "Missing input parameter",
      });
    }
    let updates = req.body;
    if (updates.discount_id === "") {
      updates.discount_id = null;
    }
    //them anh
    let newImages = req.files;
    newImages.forEach((image) => {
      imageService.createImage({
        url: image.filename,
        book_id: id,
        is_main: 0,
      });
    });
    //cap nhat anh main
    let mainImageId = parseInt(updates.main_image_id);
    if (mainImageId) {
      await imageService.changeMainImage(mainImageId);
    }
    let { book } = await bookService.updateBook(id, updates);
    return res.status(200).json({
      message: "Success",
      book: book,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Update book failed",
      error: error.message,
    });
  }
};

const handleGetAllReferences = async (req, res) => {
  try {
    let {
      genres,
      languages,
      publishers,
      authors,
      bookstatus,
      coverformats,
      discounts,
    } = await bookService.getAllReferences();
    return res.status(200).json({
      message: "Success",
      genres: genres || [],
      languages: languages || [],
      publishers: publishers || [],
      authors: authors || [],
      bookstatus: bookstatus || [],
      coverformats: coverformats || [],
      discounts: discounts || [],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get all references failed",
      error: error.message,
    });
  }
};

module.exports = {
  handleGetById: handleGetById,
  handleGetPage: handleGetPage,
  handleUpdate: handleUpdate,
  handleGetAllReferences: handleGetAllReferences,
};
