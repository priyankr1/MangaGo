import express from "express";
import { loginAdmin, addManga, getManga } from "../controllers/AdminController.js";
import authAdmin from "../middlewares/authAdmin.js";
import { uploadMangaImages } from "../middlewares/multer.js"; // ⬅ Corrected named import

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.get("/all-manga", getManga);
adminRouter.post("/add-manga", uploadMangaImages, addManga);

export default adminRouter;


