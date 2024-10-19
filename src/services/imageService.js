import db from "../models";

const baseUrl = `http://${process.env.HOSTNAME}/img/`;

const createImage = async ({ url, book_id, is_main }) => {
  try {
    let newImage = await db.bookimages.create({
      url,
      book_id,
      is_main,
    });
    return newImage;
  } catch (error) {
    throw new Error(error);
  }
};

const changeMainImage = async (imageId) => {
  try {
    //update main cu
    await db.bookimages.update({ is_main: 0 }, { where: { is_main: 1 } });
    //update main moi
    let mainImage = await db.bookimages.update(
      { is_main: 1 },
      { where: { bookImage_id: imageId } }
    );

    return mainImage;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createImage,
  changeMainImage,
};
