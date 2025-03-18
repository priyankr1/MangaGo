import mongoose from "mongoose";

const bookmarkedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mangaId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Manga',
    required: true
  },
  mangaData: {
    type: Object,
    required: true
  },
  mark: {
    type: Boolean,
    default:true,
    required: true
  }
}
) 
const Bookmarked = mongoose.model("Bookmarked", bookmarkedSchema);

export default Bookmarked;
