const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");


const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/", (req, res)=>{
    res.send("Netflix-Clone backned is running...");
});

// //testing omdm api

// app.get("/api/test-omdb", async(req, res) => {
//     try {
//         const response = await axios.get("https://www.omdbapi.com/", {
//                 params: {
//                     apikey: process.env.OMDB_API_KEY,
//                     t: "Inception"
            
//                 }
//             }
//         );
//         res.json(response.data);
//     } catch (error) {
//         console.error("OMDB Error:", error.response?.data || error.message);

//         res.status(500).json({
//             message: "Failed to fetch data from OMDB"
//         });
//     }
// });

//search movie by name to get details using omdb api if movie is found in omdb
app.get("/api/movies/search", async (req, res) => {
    try {
        const {query, page=1} = req.query;
        if (!query) {
            return res.status(400).json({
                message: "Search query is Required"
            });
        }

        const response = await axios.get("https://www.omdbapi.com/", {
            params: {
                apikey: process.env.OMDB_API_KEY,
                s: query,
                type: "movie",
                page: page
            }
        });
        res.json(response.data);

    } catch (error) {
        console.error("OMDb Search Error:", error.response?.data || error.message);
        res.status(500).json({
            message: "Failed to search movies"
        });
    }
});

//To etch complete information about a specific movie using its IMDb ID
app.get("/api/movies/:imdbId", async (req, res) => {
    try {
        const {imdbId} = req.params;
        if (!imdbId) {
            return res.status(400).json({
                message: "IMDB id is required"
            });
        }
        const response = await axios.get("https://www.omdbapi.com/", {
            params: {
                apikey: process.env.OMDB_API_KEY,
                i: imdbId,
                plot: "full"
            }
        });
        res.json(response.data);

    } catch (error) {
        console.error("OMDB details error :", error.response?.data || error.message);
        res.status(500).json({
            message: "failed to fetch movie details"
        })
    }
});
app.get("/api/trailer", async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                message: "Movie title is required"
            });
        }

        const response = await axios.get(
            "https://www.googleapis.com/youtube/v3/search",
            {
                params: {
                    part: "snippet",
                    q: `${query} official trailer`,
                    type: "video",
                    maxResults: 1,
                    key: process.env.YOUTUBE_API_KEY
                }
            }
        );

        const video = response.data.items[0];

        if (!video) {
            return res.status(404).json({
                message: "Trailer not found"
            });
        }

        res.json({
            videoId: video.id.videoId,
            title: video.snippet.title
        });

    } catch (error) {
        console.error(
            "YouTube Trailer Error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Failed to fetch trailer"
        });
    }
});

app.listen(PORT, ()=>{
    console.log(`Server Running on http://localhost:${PORT}`);
});