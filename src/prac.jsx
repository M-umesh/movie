import { useState } from "react";

function Show() {
  const [search, setSearch] = useState("");
  const [notfound, setNotFound] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  async function fetchMovies() {
    try {
      const url = `https://www.omdbapi.com/?s=${search}&apikey=b086ff35`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        const movies = data.Search.map((m) => ({
          imdbid: m.imdbID,
          title: m.Title,
          year: m.Year,
          img: m.Poster,
        }));
        setResults(movies);
        setNotFound(false);
      } else {
        setResults([]);
        setNotFound(true);
      }
    } catch {
      setError("failed to veatch movies");
      setResults([]);
      setNotFound(true);
    }
  }

  return (
    <div>
      <h1>🎥Search Any movie</h1>
      <input
        type="text"
        placeholder="search Movie"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={fetchMovies}>search</button>

      {results.map((movie) => (
        <li key={movie.imdbid}>
          <img src={movie.img} alt={movie.title} />
          {movie.title}

          {movie.year}
        </li>
      ))}
    </div>
  );
}
export default Show;
