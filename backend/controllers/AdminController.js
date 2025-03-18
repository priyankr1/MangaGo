import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import Manga from "../models/mangaModel.js";

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Complete the login form" });
    }
    console.log("user email and pass" + email, password);
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PAS
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      4;
      console.log(token);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Unautharized user" });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

const addManga = async (req, res) => {
    try {
        console.log("add manga");
        const { name, about, type, releasedOn } = req.body;

        // ✅ FIX: Parse `seasons` only if it exists
        const seasons = req.body.seasons ? JSON.parse(req.body.seasons) : [];
        console.log("Parsed Seasons:", seasons); // Debugging

        // Function to upload buffer to Cloudinary
        const uploadToCloudinary = (fileBuffer, folder) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder, resource_type: "image" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                );
                uploadStream.end(fileBuffer);
            });
        };

        // Upload banner image
        const bannerFile = req.files?.banner ? req.files.banner[0] : null;
        console.log("Banner File:", bannerFile);

        const bannerUrl = bannerFile
            ? await uploadToCloudinary(bannerFile.buffer, "manga_banners")
            : null;

       
        await Promise.all(
            seasons.map(async (season, index) => {
                const seasonImagesKey = `season_images_${index}`;
                if (req.files?.[seasonImagesKey]) {
                    season.pages = await Promise.all(
                        req.files[seasonImagesKey].map(async (file) => ({
                            image_url: await uploadToCloudinary(file.buffer, "manga_seasons"),
                        }))
                    );
                } else {
                    season.pages = [];
                }
            })
        );

        // Save to MongoDB
        const newManga = new Manga({
            name,
            about,
            type,
            releasedOn,
            banner: bannerUrl,
            seasons, 
        });
        await newManga.save();

        res.status(201).json({
            success: true,
            message: "Manga added successfully",
            manga: newManga,
        });
    } catch (error) {
        console.error("Error adding manga:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const getManga = async (req, res) => {
  try {
    const mangas = await Manga.find();
    res.status(200).json({success:true,mangas});
  } catch (error) {
    console.error("Error fetching manga:", error);
    res.status(500).json({success:false, error: "Server error" });
  }
};

const updateManga = async (req, res) => {
  try {
    const { id, seasons } = req.body;
    const parsedSeasons = seasons ? JSON.parse(seasons) : [];

    const manga = await Manga.findById(id);
    if (!manga) return res.json({ success: false, message: "Manga not found" });

    // Cloudinary upload helper
    const uploadToCloudinary = (fileBuffer, folder) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder, resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        uploadStream.end(fileBuffer);
      });
    };

    // 1️⃣ Update Banner (if provided)
    const bannerFile = req.files?.banner?.[0] || null;
    if (bannerFile) {
      const bannerUrl = await uploadToCloudinary(bannerFile.buffer, "manga_banners");
      manga.banner = bannerUrl;
    }

    // 2️⃣ Add New Seasons
    for (let i = 0; i < parsedSeasons.length; i++) {
      const season = parsedSeasons[i];
      const key = `season_images_${i}`;
      let pages = [];

      // Upload images if any
      if (req.files[key]) {
        pages = await Promise.all(
          req.files[key].map(async (file) => ({
            image_url: await uploadToCloudinary(file.buffer, "manga_seasons"),
          }))
        );
      }

      // Push new season with images
      manga.seasons.push({
        season_name: season.season_name,
        pages,
      });
    }

    await manga.save();

    return res.json({ success: true, message: "Manga updated successfully" });

  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};
const deleteManga =async (req,res) =>{
  try {
    const {id} =req.body
    await Manga.findByIdAndDelete(id)
    return res.json({success:true,message:"manga Deleted"})
  } catch (error) {
    console.log(error.message);
    return res.json({success:false,message:error.message})
  }
}


export { loginAdmin, getManga, addManga , updateManga , deleteManga};
