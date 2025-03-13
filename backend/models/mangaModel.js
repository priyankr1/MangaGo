import mongoose from "mongoose";

const mangaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: [true, "Book already exists"]
    },
    about: {
        type: String,
        required: [true, "Description is required"]
    },
    banner: {
        type: String,
        required: [true, "Banner is required"]
    },
    type: {
        type: String,
        required: [true, "Type is required"]
    },
    releasedOn: {
        type: String,
        required: [true, "Released date required"]
    },
    seasons: [
        {
            season_name: {
                type: String,
                required: true
            },
            pages: []    
         }
    ]
});

const Manga = mongoose.model("Manga", mangaSchema);
export default Manga;
