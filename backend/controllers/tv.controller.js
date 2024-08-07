import {fetchFromTMBD} from '../Services/tmdb.service.js'

export async function getTredingTV(req, res){
    try {
        const data = await fetchFromTMBD('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1');
        const randomMovie = data.results[Math.floor(Math.random() *data.results.length)];
        res.json({succes:true,content: randomMovie})
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal Server Error'})
    }
} 

export async function getTVTrailer(req, res){
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
        res.json({success: true, traliers: data.results})
    } catch (error) {
        if(error.message.includes(404)){
            return res.status(404).send(null)
        }
        res.status(500).json({success: false, message: "Internal server Error"});
        
    }
}

export async function getTVDetails(req, res){
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
        res.status(200).json({success:true, content: data})

    } catch (error) {
        if(error.message.includes('404')){
            return res.status(404).send(null)
        }
        res.status(500).json({success: false, message:"Internal Sever Error"})
    }

}

export async function getSimilarTV(req, res){
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
        res.json({succes:true,similar: data.results})
        
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

export async function getTVbyCategories(req, res) {
    const { category } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
        res.json({success: true, movies: data.results})
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"})
        
    }
    
}