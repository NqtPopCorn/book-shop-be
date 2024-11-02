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
    let sort_type = req.query.sort_type || "asc";
    let { books, total_page } = await bookService.getPage(
      page,
      limit,
      type,
      query,
      sort_type
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
    let newFiles = req.files;
    newFiles.forEach((file, index) => {
      imageService.createImage({
        url: file.filename,
        book_id: id,
        is_main: 0,
      });
    });
    //cap nhat anh main
    let mainImageId = parseInt(updates.main_image_id);
    if (mainImageId) {
      await imageService.changeMainImage(id, mainImageId);
    }
    //xoa anh
    let deletedImages = updates.deletedImages
      ? JSON.parse(updates.deletedImages)
      : [];
    if (deletedImages) {
      deletedImages.forEach(async (img) => {
        //cap nhat lai anh main neu bi xoa
        if (img.is_main === 1) {
          let altImage = await imageService.getOneAltImage(id);
          if (altImage) {
            altImage.is_main = 1;
            await altImage.save();
          }
        }
        imageService.deleteImage(parseInt(img.bookImage_id));
      });
    }
    let { book } = await bookService.updateBook(id, updates); //loi id chua parseInt
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

let handleCreate = async (req, res) => {
  try {
    let newBook = parseBody(req.body);
    let newImages = req.files;
    let { book } = await bookService.createBook(newBook);
    //them anh
    newImages.forEach((image, index) => {
      imageService.createImage({
        url: image.filename,
        book_id: book.book_id,
        is_main: index === 0 ? 1 : 0,
      });
    });
    return res.status(200).json({
      message: "Success",
      book: book,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Create book failed",
      error: error.message,
    });
  }
};

module.exports = {
  handleGetById: handleGetById,
  handleGetPage: handleGetPage,
  handleUpdate: handleUpdate,
  handleGetAllReferences: handleGetAllReferences,
  handleCreate: handleCreate,
};

function parseBody(body) {
  //parseInt all id
  let newBook = {
    title: body.title,
    num_page: parseInt(body.num_page),
    size: body.size,
    weight: body.weight,
    publication_year: parseInt(body.publication_year),
    price_receipt: parseInt(body.price_receipt),
    decription: body.decription,
    profit_rate: parseFloat(body.profit_rate),
    stock_quantity: parseInt(body.stock_quantity),
    status_id: parseInt(body.status_id),
    language_id: parseInt(body.language_id),
    publisher_id: parseInt(body.publisher_id),
    genre_id: parseInt(body.genre_id),
    discount_id: body.discount_id ? parseInt(body.discount_id) : null,
    cover_format_id: parseInt(body.cover_format_id),
  };
  return newBook;
}
