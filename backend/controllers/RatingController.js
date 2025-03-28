import ratingModel from "../models/ratingModel.js";

const rateManga = async (req, res) => {
    try {
        const { userId, mangaId, rating } = req.body;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5" });
        }

        let userRating = await ratingModel.findOne({ userId });

        if (userRating) {
            const mangaIndex = userRating.ratingDetails.findIndex(item => item.mangaId === mangaId);

            if (mangaIndex !== -1) {
                userRating.ratingDetails[mangaIndex].rating = rating;
            } else {
                userRating.ratingDetails.push({ mangaId, rating });
            }

            await userRating.save(); 
        } else {
            userRating = new ratingModel({
                userId,
                ratingDetails: [{ mangaId, rating }]
            });

            await userRating.save();
        }
        res.status(200).json({success:true, message: "Rating saved successfully", userRating });
    } catch (error) {
        console.error("Error saving rating:", error);
        res.status(500).json({success:false, error: "Internal server error" });
    }
};



const getRating = async (req, res) => {
    try {
        const { mangaId } =  req.query;
        if (!mangaId) {
            return res.status(400).json({ error: "Manga ID is required" });
        }


        const allRatings = await ratingModel.find({ "ratingDetails.mangaId": mangaId });

        let totalRating = 0;
        let ratingCount = 0;

        if(allRatings){
            allRatings.forEach(userRating => {
                userRating.ratingDetails.forEach(ratingItem => {
                    if (ratingItem.mangaId === mangaId) {
                        totalRating += ratingItem.rating;  // Sum ratings
                        ratingCount++;  // Count total ratings
                    }
                });
            });
        }
   

        // Calculate average rating
        const averageRating = ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : 0;

        res.status(200).json({success:true, mangaId, averageRating, ratingCount });
    } catch (error) {
        console.error("Error fetching rating:", error);
        res.status(500).json({success:false, error: "Internal server error" });
    }
};

const getUserRating = async (req, res) => {
    try {
        const { userId, mangaId } =  req.query;

        if (!userId || !mangaId) {
            console.log("errror")
            return res.status(400).json({ success: false, error: "User ID and Manga ID are required" });
          
        }

        // Find user rating document
        const userRating = await ratingModel.findOne({ userId });

        if (!userRating) {
            return res.status(200).json({ success: true, Rating: null });
        }

        // Find the specific manga rating
        const mangaRating = userRating.ratingDetails.find(item => item.mangaId === mangaId);

        res.status(200).json({
            success: true,
            Rating: mangaRating ? mangaRating.rating : 0
        });
    } catch (error) {
        console.error("Error fetching rating:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};


export  {rateManga,getRating,getUserRating}
