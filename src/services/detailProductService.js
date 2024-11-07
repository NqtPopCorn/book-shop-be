const { where, Op } = require("sequelize");
const db = require("../models");
const bookimages = require("../models/bookimages");

const getDetailProductDataByID = async (productID) => {
    try {
        const products = await db.initModel.books.findOne({
            where: { book_id: Number(productID) },
            include: [{
                model: db.initModel.publishers,
                as: 'publisher',
            }, {
                model: db.initModel.bookauthors,
                as: 'bookauthors',
                include: [{
                    model: db.initModel.authors,
                    as: "author"
                }]
            }, {
                model: db.initModel.goodsreceiptdetails,
                as: "goodsreceiptdetails",
                include: [{
                    model: db.initModel.goodsreceipt,
                    as: "receipt",
                    include: [{
                        model: db.initModel.providers,
                        as: "provider"
                    }]
                }]
            }, {
                model: db.initModel.bookdiscount,
                as: "discount"
            }]
        });
        if (!products) {
            return { error: 4, message: "Product is not found", products: [] };
        }
        return { error: 0, message: "Get data product succeed", products: formattedProduct(products) }; // Trả về sản phẩm
    } catch (error) {
        console.error(">>> Service getDetailProductDataByID ", error.message, error.stack);
        return { error: 3, message: "Connect data is not successful", products: [] };
    }
}

const getImagesForThumbnailService = async (productID) => {
    try {
        const images = await db.bookimages.findAll({
            where: { book_id: Number(productID) },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        if (!images) {
            return { error: 4, message: "Images is not found", images: [] };
        }
        return { error: 0, message: "Get data images succeed", images: images };
    } catch (error) {
        console.error(">>> Service getImagesForThumbnailService ", error.message, error.stack);
        return { error: 3, message: "Connect data is not successful", images: [] };
    }
}

const formattedProduct = (products) => {
    return ({
        id: products.book_id,
        title: products.title, // Giả sử bạn có thuộc tính title
        genreId: products.genre_id,
        publisher: products.publisher.name || 'N/A', // Lấy tên nhà xuất bản
        publisherYear: products.publication_year || 'N/A',
        stock: products.stock_quantity || 0,
        weight: products.weight || 'N/A',
        size: products.size || 'N/A',
        numPage: products.num_page || 'N/A',
        salePrice: products.price_receipt || 0,
        discountValue: products.discount || 0,
        description: products.decription || "",
        authors: products.bookauthors.map(ba => ({
            id: ba.author.author_id,
            name: ba.author.name // Lấy tên tác giả
        })),
        goodsReceipts: products.goodsreceiptdetails.map(detail => ({
            quantity: detail.quantity,
            price: detail.price,
            subtotal: detail.subtotal,
            receiptId: detail.receipt_id,
            provider: detail.receipt.provider?.name || "N/A",
        }))
    });
}

const getRelatedProductService = async (productId, genreId) => {
    try {
        const relatedProducts = await db.initModel.books.findAll({
            where: { book_id: { [Op.not]: productId }, genre_id: genreId },
            include: [{
                model: db.initModel.bookdiscount,
                as: "discount"
            }, {
                model: db.initModel.bookimages,
                as: "bookimages",
                where: { is_main: 1 }
            }]
        });
        if (!relatedProducts || relatedProducts.length === 0) {
            return { error: 4, message: "Related products not found", relatedProducts: [] };
        }
        return { error: 0, message: "Get data for related products succeeded", relatedProducts };
    } catch (error) {
        console.error(">>> Service getRelatedProductService Error:", error.message, "\nStack:", error.stack);
        return { error: 3, message: "Data connection failed", relatedProducts: [] };
    }
};

module.exports = {
    getDetailProductDataByID,
    getImagesForThumbnailService,
    getRelatedProductService
}