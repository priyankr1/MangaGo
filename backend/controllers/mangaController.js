import userModel from "../models/userModel.js";
import mangaModel from "../models/mangaModel.js";

const bookMarked = async (req, res) => {
  try {
    const { userId, mangaId } = req.body;

    console.log(mangaId);
    let user = await userModel.findById(userId);

    if (user.bookMarkedManga.includes(mangaId)) {
      return res.json({ success: false, message: "Manga already bookmarked" });
    }
    user = await userModel
      .findByIdAndUpdate(
        userId,
        { $push: { bookMarkedManga: mangaId } },
        { new: true }
      )
      .populate("bookMarkedManga");
      const manga=await mangaModel.findById(mangaId);

    return res.json({ success: true, message: "Manga Marked",manga });
  } catch (error) {
    console.log({ success: false, message: error.message });
    return res.json({ success: false, message: error.message });
  }
};

const getBookMarked = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await userModel.findById(userId).populate("bookMarkedManga");
    const mangaData = user.bookMarkedManga;
    return res.json({ success: true, mangaData });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

const removeBookMarked = async (req, res) => {
  try {
    const { id, userId } = req.body;
    if (!id) {
      return res.json({ success: false, message: "No id Found" });
    }
    await userModel.findByIdAndUpdate(
      userId,
      {
        $pull: { bookMarkedManga: id },
      },
      { new: true }
    );

    return res.json({ success: true, message: "Marked manga Deleted" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export { bookMarked, getBookMarked, removeBookMarked };
