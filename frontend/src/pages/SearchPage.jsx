import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";

function SearchPage() {
    const [activeTab, setActiveTab] = useState("movie");
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const { setContentType } = useContentStore();

    const handleTabClick = (type) => {
        setActiveTab(type);
        setContentType(type);
        setResults([]);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
            setResults(res.data.content || res.data.data || []);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("Nothing found, make sure you are searching under the right category.");
            } else {
                toast.error("An error occurred, please try again later");
            }
        }
    };


    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <div className="container mx-auto px-4 pt-8">
                <div className="flex justify-center gap-3 mb-4">
                    <button
                        className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
                        onClick={() => handleTabClick("movie")}
                    >
                        Movies
                    </button>
                    <button
                        className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
                        onClick={() => handleTabClick("tv")}
                    >
                        TV Shows
                    </button>
                    <button
                        className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
                        onClick={() => handleTabClick("person")}
                    >
                        Person
                    </button>
                </div>
                <form className="flex gap-2 items-stretch mb-8 mx-w-2xl mx-auto" onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={"search for a " + activeTab}
                        className="w-full p-2 rounded bg-gray-800 text-white"
                    />
                    <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
                        <Search className="size-6" />
                    </button>
                </form>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {results.map((result) => {
                        if (!result.poster_path && !result.profile_path) return null;
                        return (
                            <div className="bg-gray-800 p-4 rounded" key={result.id}>
                                {activeTab === 'person' ? (
                                    <div className="flex flex-col items-center">
                                        <img src={ORIGINAL_IMG_BASE_URL + result.profile_path} alt={result.name} className="max-h-96 rounded mx-auto" />
                                        <h2 className="text-xl font-bold mt-2">{result.name}</h2>
                                    </div>
                                ) : (
                                    <Link
										to={"/watch/" + result.id}
										onClick={() => {
											setContentType(activeTab);
										}}
									>
                                        <img src={ORIGINAL_IMG_BASE_URL + result.poster_path} alt={result.name} className="max-h-96 rounded mx-auto" />
                                        <h2 className="text-xl font-bold mt-2">{result.name || result.title}</h2>
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
