import { useState, useEffect } from "react";
import heros from "./assets/heros.png";
import "./index.css";

function Cinema({ setShowGallery, page, setTotalPages, onSearchReset }) {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  const MOVIES_PER_PAGE = 4;

  async function fetchMovies(query) {
    if (!query) return;
    setError(null);
    try {
      const url = `https://www.omdbapi.com/?s=${query}&apikey=b086ff35`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        const movies = data.Search.map((m) => ({
          imdbID: m.imdbID,
          title: m.Title,
          img: m.Poster !== "N/A" ? m.Poster : heros,
          year: m.Year,
        }));
        setResults(movies);
        setNotFound(false);
        setShowGallery(false);
        setTotalPages(Math.ceil(movies.length / MOVIES_PER_PAGE));
        if (onSearchReset) onSearchReset(); // Reset to page 1
      } else {
        setResults([]);
        setNotFound(true);
        setShowGallery(false);
        setTotalPages(1);
      }
    } catch (err) {
      setError("Failed to fetch movies");
      setResults([]);
      setShowGallery(false);
      setTotalPages(1);
    }
  }

  const handleSearch = () => {
    const query = search.toLowerCase().trim();
    if (query === "") {
      setResults([]);
      setNotFound(false);
      setShowGallery(true);
      setTotalPages(1);
      if (onSearchReset) onSearchReset(); // Reset to page 1 when search is cleared
    } else {
      fetchMovies(query);
    }
  };

  // Calculate which movies to show on this page
  const startIdx = (page - 1) * MOVIES_PER_PAGE;
  const pageResults = results.slice(startIdx, startIdx + MOVIES_PER_PAGE);

  return (
    <div className="main-div">
      <div className="header">
        <img src="pvr-image.png" alt="" className="pvrimage" />
        <p className="para">Find Your Favourite Movie</p>
        <p className="premium">PREMIUM</p>
        <img className="glow-img" src="line.png" alt="" />

        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search Movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            <img src="/search-icon.png" alt="search" className="search-icon" />
            Search
          </button>
        </div>
      </div>

      {(pageResults.length > 0 || notFound || error) && (
        <div className="results-container">
          {error && <h2 className="error-text">{error}</h2>}

          {notFound ? (
            <div className="notfound-container">
              <h2 className="notfound-text">
                <span className="gold-text">404</span> No Data Found!
              </h2>
              <img src="/popcorn.png" alt="popcorn" className="notfound-img" />
            </div>
          ) : (
            pageResults.map((movie) => (
              <div key={movie.imdbID} className="movie-card">
                {!movie.img ? (
                  <div className="poster-fallback">
                    <img
                      src="/clapper.png"
                      alt="Poster Unavailable"
                      className="poster-fallback-img"
                    />
                    <p className="poster-fallback-text">Poster Unavailable</p>
                  </div>
                ) : (
                  <img
                    src={movie.img}
                    alt={movie.title}
                    className="movie-poster"
                  />
                )}
                <p className="movie-title">{movie.title}</p>
                {movie.year && <span className="movie-year">{movie.year}</span>}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Cinema;
