import { query } from "express";
import { User } from "../models/user.model.js";
import { fetchFromTMBD } from "../Services/tmdb.service.js";

export async function searchPerson(req, res) {
    const { query } = req.params; // Use req.query to get query parameters
    try {
        const response = await fetchFromTMBD(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.length === 0) { // Check the 'results' array
            return res.status(404).send(null); // Use 404 for not found
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: 'person',
                    searchDate: new Date()
                }
            }
        });

        res.status(200).json({ success: true, data: response.results });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function searchMovie(req, res) {
    const { query } = req.params
    try {
        const response = await fetchFromTMBD(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.length=== 0 ){
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: 'movie',
                    searchDate: new Date()
                }
            }
        });
        res.status(200).json({success: true, content: response.results})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function searchTV(req, res) {
    const { query } = req.params
    try {
        const response = await fetchFromTMBD(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.length=== 0 ){
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: 'tv',
                    searchDate: new Date()
                }
            }
        });
        res.status(200).json({success: true, content: response.results})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export async function getSearchHistory(req, res) {
    try {
        res.status(200).json({success: true, content: req.user.searchHistory})
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal Server Error'});

    
    }
    
}

export async function removeitemfromsearchlist(req, res) {
    const { id } = req.params
    const Id = Number(id)
    try {
        await User.findByIdAndUpdate(req.user._id,{
            $pull: {
                searchHistory: { id: Id },
            }
        } )
        res.status(200).json({success: true, message: "Item removed from search history"})
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"})
        
    }
    
}
