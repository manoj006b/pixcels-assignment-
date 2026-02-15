const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// ✅ Load movies data
const movies = JSON.parse(
  fs.readFileSync(path.join(__dirname, "movies_metadata.json"), "utf-8")
);

// ✅ 1. List all movies
app.get("/api/movies", (req, res) => {
  const formattedMovies = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    tagline: movie.tagline,
    vote_average: movie.vote_average
  }));

  res.json(formattedMovies);
});

// ✅ 2. Get single movie by ID
app.get("/api/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);

  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.json(movie);
});
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});

