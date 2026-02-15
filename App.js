import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await fetch("/api/movies");
    const data = await res.json();
    setMovies(data);
  };

  const fetchSingleMovie = async (id) => {
    const res = await fetch(`/api/movies/${id}`);
    const data = await res.json();
    setSelectedMovie(data);
  };

  const goBack = () => {
    setSelectedMovie(null);
  };

  // ------------------------
  // MOVIE LIST PAGE
  // ------------------------
  if (!selectedMovie) {
    return (
      <div className="container">
        <h1>🎬 Movies List</h1>
        <div className="grid">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="card"
              onClick={() => fetchSingleMovie(movie.id)}
            >
              <h3>Titile:{movie.title}</h3>
              <p>Tagline:{movie.tagline || "No tagline available"}</p>
              <p>⭐ {movie.vote_average}/10</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ------------------------
  // SINGLE MOVIE PAGE
  // ------------------------
  const localizedDate = new Date(
    selectedMovie.release_date.split("/").reverse().join("-")
  ).toLocaleDateString();

  return (
    <div className="container movie-detail-container">
      <button className="backBtn" onClick={goBack}>
        ⬅ Back
      </button>

      <h1>{selectedMovie.title}</h1>

      <p><strong>Original Title:</strong> {selectedMovie.original_title}</p>
      <p><strong>Overview:</strong> {selectedMovie.overview}</p>
      <p><strong>Status:</strong> {selectedMovie.status}</p>
      <p><strong>Release Date:</strong> 📅 {localizedDate}</p>
      <p><strong>Runtime:</strong> 🕒 {selectedMovie.runtime} minutes</p>
      <p><strong>Rating:</strong> ⭐ {selectedMovie.vote_average}/10</p>
      <p><strong>Vote Count:</strong> {selectedMovie.vote_count}</p>
    </div>
  );
}

export default App;
