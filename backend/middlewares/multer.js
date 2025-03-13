import multer from "multer";

const storage = multer.memoryStorage(); // Store in memory for Cloudinary

const storage2=multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
 })
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images are allowed"), false);
};
const upload = multer({ storage:storage2, fileFilter });

export const uploadMangaImages = (req, res, next) => {
    const dynamicFields = [{ name: "banner", maxCount: 1 }];

    // ✅ FIX: Handle dynamic season images correctly
    for (let i = 0; i < 10; i++) { // Adjust if needed
        dynamicFields.push({ name: `season_images_${i}`, maxCount: 50 });
    }

    multer({ storage:storage, fileFilter }).fields(dynamicFields)(req, res, next);
};


export default upload;

