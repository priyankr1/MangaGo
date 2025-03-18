import express from "express";
import { loginAdmin, addManga, getManga, updateManga, deleteManga } from "../controllers/AdminController.js";
import authAdmin from "../middlewares/authAdmin.js";
import { uploadMangaImages } from "../middlewares/multer.js"; 

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.get("/all-manga", getManga);
adminRouter.post("/add-manga",authAdmin, uploadMangaImages, addManga);
adminRouter.post("/update-manga",authAdmin,uploadMangaImages,updateManga);
adminRouter.post("/delete-manga",authAdmin,deleteManga);


export default adminRouter;


