import { useState } from "react";

function Movie() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMovies(query) {
    if (!query) return;
    setError(null);
    try {
      const url = `https://www.omdbapi.com/?s=${query}&apikey=b086ff35`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        const movies = data.Search.map((m) => ({
          imdbId: m.imdbID,
          title: m.Title,
          img: m.Poster,
          year: m.Year,
        }));
        setResults(movies);
        setNotFound(false);
      } else {
        setResults([]);
        setNotFound(true);
      }
    } catch (err) {
      setError("Failed to fetch movies");
      setNotFound(false);
      setResults([]);
    }
  }

  return (
    <div>
      <h1>🎬 Movie Search</h1>

      <input
        type="text"
        placeholder="Search movie"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => fetchMovies(search)}>Search</button>

      {results.map((movie) => (
        <li key={movie.imdbId}>
          <img src={movie.img} alt={movie.title} width="80" />

          {movie.title}
          {movie.year}
        </li>
      ))}
    </div>
  );
}

export default Movie;
