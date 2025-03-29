import mongoose from "mongoose";

const mangaSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    about: { type: String, required: true },
    banner: { type: String, required: true },
    type: { type: String, required: true },
    releasedOn: { type: String, required: true },
    seasons: [
        {
            season_name: { type: String, required: true },
            pages: []
        }
    ],
    views: [
        {
            userId: String,
            timestamp: { type: Date, default: Date.now }
        }
    ],
    Publisher:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      
});

const Manga = mongoose.model("Manga", mangaSchema);
export default Manga;
