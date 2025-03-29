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

const addViews = async (req, res) => {
  try {
      const { userId, mangaId } = req.body;
      
      const manga = await mangaModel.findById(mangaId);
      if (!manga) {
          return res.status(404).json({ success: false, message: "Manga not found" });
      }
    
      const now = new Date();
      const fiveMinutesAgo = new Date(now - 5 * 60 * 1000);

      const lastView = manga.views.find(view => view.userId === userId);

      if (lastView && new Date(lastView.timestamp) > fiveMinutesAgo) {
          return res.json({ success: true, views: manga.views.length });
      }

      const updatedManga = await mangaModel.findOneAndUpdate(
          { _id: mangaId }, 
          { $push: { views: { userId, timestamp: now } } },
          { new: true } 
      );

      return res.json({ success: true, views: updatedManga.views.length });

  } catch (error) {
      console.error(error.message);
      return res.status(500).json({ success: false, message: error.message });
  }
};

export { bookMarked, getBookMarked, removeBookMarked,addViews };
