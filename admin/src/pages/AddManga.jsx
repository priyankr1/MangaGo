import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../AppContext/AppContext";
import { toast } from "react-toastify";

const AddManga = () => {
    const { aToken, backendUrl } = useContext(AppContext);
    const [mangaData, setMangaData] = useState({
        name: "",
        about: "",
        type: "",
        releasedOn: "",
        banner: null,
        seasons: [],
    });

    const handleChange = (e) => {
        setMangaData({ ...mangaData, [e.target.name]: e.target.value });
    };

    const handleBannerUpload = (e) => {
        setMangaData({ ...mangaData, banner: e.target.files[0] });
    };

    const addSeason = () => {
        setMangaData((prev) => ({
            ...prev,
            seasons: [...prev.seasons, { season_name: "", images: [] }],
        }));
    };

    const handleSeasonChange = (index, e) => {
        const updatedSeasons = [...mangaData.seasons];
        updatedSeasons[index].season_name = e.target.value;
        setMangaData({ ...mangaData, seasons: updatedSeasons });
    };

    const handleSeasonImagesUpload = (index, e) => {
        const updatedSeasons = [...mangaData.seasons];
        updatedSeasons[index].images = Array.from(e.target.files);
        setMangaData({ ...mangaData, seasons: updatedSeasons });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    
    
        Object.keys(mangaData).forEach((key) => {
            if (key !== "seasons" && key !== "banner") {
                formData.append(key, mangaData[key]);
            }
        });
    
     
        if (mangaData.banner) formData.append("banner", mangaData.banner);
    

        const formattedSeasons = mangaData.seasons.map((season) => ({
            season_name: season.season_name,
            pages: [],
        }));
    
        // Append season images and associate them with the correct season
        mangaData.seasons.forEach((season, index) => {
            season.images.forEach((image) => {
                formData.append(`season_images_${index}`, image);
            });
        });
    
        // ✅ Send seasons as a JSON string
        formData.append("seasons", JSON.stringify(formattedSeasons));
    
        try {
            const response = await axios.post(`${backendUrl}/api/admin/add-manga`, formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    atoken:aToken
                },
            });
            if (response.data.success) {
                toast.success(response.data.message);

                setMangaData({
                    name: "",
                    about: "",
                    type: "",
                    releasedOn: "",
                    banner: null,
                    seasons: [],
                });

                document.querySelectorAll("input[type='file']").forEach(input => input.value = "");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message);
        }
    };
    
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add New Manga</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                <input type="text" name="name" placeholder="Manga Name" value={mangaData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
                <textarea name="about" placeholder="Description" value={mangaData.about} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="type" placeholder="Type" value={mangaData.type} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="releasedOn" value={mangaData.releasedOn} placeholder="Released On" onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="file" accept="image/*" onChange={handleBannerUpload} required className="w-full p-2 border rounded" />

                <h3 className="text-lg font-semibold">Seasons</h3>
                {mangaData.seasons.map((season, seasonIndex) => (
                    <div key={seasonIndex} className="border p-4 rounded">
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
                <button type="button" onClick={addSeason} className="bg-green-500 text-white p-2 rounded">
                    + Add Season
                </button>
                <br />
                <button type="submit" className="bg-purple-500 text-white p-2 rounded w-full">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddManga;