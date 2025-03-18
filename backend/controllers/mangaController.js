import Bookmarked from "../models/bookMarked.js";

const bookMarked = async (req, res) => {
  try {
    const { userId, mangaId, mangaData } = req.body;
    const existingBookmark = await Bookmarked.findOne({
      user: userId,
      mangaId: mangaId,
    });
    if (existingBookmark) {
      return res.json({ success: false, message: "Manga already bookmarked" });
    }
    const newbookMarked = new Bookmarked({
      user: userId,
      mangaId: mangaId,
      mangaData,
      mark:false
    });

    await newbookMarked.save();
    return res.json({ success: true, message: "Manga Marked" });
  } catch (error) {
    console.log({ success: false, message: error.message });
    return res.json({ success: false, message: error.message });
  }
};

const getBookMarked = async(req,res) =>{
 try {
  const {userId} =req.query
  const mangaData = await Bookmarked.find({ user: userId })
  return res.json({success:true,mangaData})
 } catch (error) {
    console.log(error.message)
    return res.json({success:false,message:error.message})
 }
}

const removeBookMarked = async(req,res) =>{
  try {
      const {id}=req.body
      if(!id){
        return res.json({success:false,message:"No id Found"})
      }
      await Bookmarked.findByIdAndDelete(id)
      return res.json({success:true,message:"Marked manga Deleted"})
  } catch (error) {
    console.log(error.message)
    return res.json({success:false,message:error.message}) 
  }
}


export {bookMarked,getBookMarked,removeBookMarked}