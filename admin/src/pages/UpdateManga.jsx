import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../AppContext/AppContext";
import { toast } from "react-toastify";

const UpdateManga = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { aToken, backendUrl, mangas } = useContext(AppContext);
    const [manga, setManga] = useState(null);
    const [mangaData, setMangaData] = useState({
        banner: null,
        seasons: [],
    });

    // Find manga by id
    const foundManga = () => {
        if (mangas.length > 0) {
            const found = mangas.find((m) => m._id === id);
            setManga(found || null);
        }
    };

    // Banner upload
    const handleBannerUpload = (e) => {
        setMangaData({ ...mangaData, banner: e.target.files[0] });
    };

    // Add new season
    const addSeason = () => {
        setMangaData((prev) => ({
            ...prev,
            seasons: [...prev.seasons, { season_name: "", images: [] }],
        }));
    };

    // Update season name
    const handleSeasonChange = (index, e) => {
        const updatedSeasons = [...mangaData.seasons];
        updatedSeasons[index].season_name = e.target.value;
        setMangaData({ ...mangaData, seasons: updatedSeasons });
    };

    // Update season images
    const handleSeasonImagesUpload = (index, e) => {
        const updatedSeasons = [...mangaData.seasons];
        updatedSeasons[index].images = Array.from(e.target.files);
        setMangaData({ ...mangaData, seasons: updatedSeasons });
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append banner if updated
        if (mangaData.banner) {
            formData.append("banner", mangaData.banner);
        }

        // Format seasons (only new seasons)
        const formattedSeasons = mangaData.seasons.map((season) => ({
            season_name: season.season_name,
            pages: [],
        }));

        // Append images of each season
        mangaData.seasons.forEach((season, index) => {
            season.images.forEach((image) => {
                formData.append(`season_images_${index}`, image);
            });
        });

        // Append seasons JSON
        formData.append("seasons", JSON.stringify(formattedSeasons));

        // Append id of the manga
        formData.append("id", id);

        try {
            const response = await axios.post(`${backendUrl}/api/admin/update-manga`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    atoken:aToken
                },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setMangaData({ banner: null, seasons: [] });
                document.querySelectorAll("input[type='file']").forEach((input) => (input.value = ""));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message);
        }
    };

    const deleteManga = async()=>{
        console.log("hello delete fuction")
        try {
            const {data}= await axios.post(`${backendUrl}/api/admin/delete-manga`,{id},{headers:{atoken:aToken}})
            if(data.success){
                toast.success(data.message)
                navigate('/all_manga')
                
            }else{
                console.log(data.message)
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        foundManga();
    }, [id, mangas]);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Bleach follows Ichigo Kurosaki, a teenager who becomes a Soul Reaper, battling Hollows and powerful enemies to protect the living and the afterlife. */}
            <h2 className="text-xl font-bold mb-4">Update and Delete Manga</h2>
            {manga ? (
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                    <p><strong>Name:</strong> {manga.name}</p>
                    <p><strong>About:</strong> {manga.about}</p>
                    <p><strong>Type:</strong> {manga.type}</p>
                    <p><strong>Released On:</strong> {manga.releasedOn}</p>

                    <div>
                        <label className="block font-medium">Update Banner:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBannerUpload}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <h3 className="text-lg font-semibold">Add New Seasons</h3>
                    {mangaData.seasons.map((season, seasonIndex) => (
                        <div key={seasonIndex} className="border p-4 rounded space-y-2">
                            <input
                                type="text"
                                placeholder="Season Name"
                                value={season.season_name}
                                onChange={(e) => handleSeasonChange(seasonIndex, e)}
                                required
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => handleSeasonImagesUpload(seasonIndex, e)}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addSeason}
                        className="bg-black text-gray-400 p-2 rounded cursor-pointer"
                    >
                        + Add Season
                    </button>
                    <br />

                    <button type="submit" className="bg-green-500 text-white p-2 rounded w-full cursor-pointer">
                        Update Manga
                    </button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
            <button onClick={deleteManga} className="bg-red-500 text-white p-2 rounded w-full mt-5 cursor-pointer">Delete Manga</button>
        </div>
    );
};

export default UpdateManga;

























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































