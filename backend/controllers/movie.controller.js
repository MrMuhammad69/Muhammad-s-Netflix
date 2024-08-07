import {fetchFromTMBD} from '../Services/tmdb.service.js'

export async function getTrendingMovie(req, res){
    try {
        const data = await fetchFromTMBD('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
        const randomMovie = data.results[Math.floor(Math.random() *data.results.length)];
        res.json({succes:true,content: randomMovie})
    } catch (error) {
        res.status(500).json({success: false, message: 'Internal Server Error'})
    }
} 

export async function getMovieTrailer(req, res){
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        res.json({success: true, traliers: data.results})
    } catch (error) {
        if(error.message.includes(404)){
            return res.status(404).send(null)
        }
        res.status(500).json({success: false, message: "Internal server Error"});
        
    }
}

export async function getMovieDetails(req, res){
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        res.status(200).json({success:true, content: data})

    } catch (error) {
        if(error.message.includes('404')){
            return res.status(404).send(null)
        }
        res.status(500).json({success: false, message:"Internal Sever Error"})
    }

}

export async function getSimilarMovies(req, res){
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
        res.json({succes:true,similar: data.results})
        
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

export async function getMovesbyCategories(req, res) {
    const { category } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
        res.json({success: true, movies: data.results})
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Server Error"})
        
    }
    
}