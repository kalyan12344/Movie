import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import ActorCard from "./actors";
import ProducerCard from "./producers";

const MovieDetails = (movieID) => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [actors, setActors] = useState(null);
  const [producers, setProducers] = useState(null);
  const [genre, setGenre] = useState(null);

  console.log(movieId, movieID);
  useEffect(() => {
    // Fetch movie details based on movieId
    Axios.get(`http://localhost:8080/movie/${movieId}`)
      .then((response) => setMovieDetails(response.data))
      .catch((error) => console.error(error));
  }, [movieId]);

  useEffect(() => {
    // Fetch movie details based on movieId
    Axios.get(`http://localhost:8080/movie/actors/${movieId}`)
      .then((response) => setActors(response.data))
      .catch((error) => console.error(error));
  }, [movieId]);

  useEffect(() => {
    // Fetch movie details based on movieId
    Axios.get(`http://localhost:8080/movie/producer/${movieId}`)
      .then((response) => setProducers(response.data))
      .catch((error) => console.error(error));
  }, [movieId]);

  useEffect(() => {
    // Fetch movie details based on movieId
    Axios.get(`http://localhost:8080/movie/genre/${movieId}`)
      .then((response) => setGenre(response.data))
      .catch((error) => console.error(error));
  }, [movieId]);
  console.log(actors);
  console.log(producers);
  console.log(genre);
  return (
    <div>
      <h2>Movie Details</h2>
      {movieDetails ? (
        <div>
          <h1>{movieDetails.title}</h1>
          <p></p>
          <p>{movieDetails.description}</p>
          <h3>Director: {movieDetails.director}</h3>
          {/* <p>Duration: {movieDetails.duration} minutes</p> */}
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
      {genre ? (
        <div className="movie-list">
          {genre.map((gen) => (
            <h2>Genre : {gen.genre_name}</h2>
          ))}
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}

      <p></p>
      <h1>Cast</h1>
      {actors ? (
        <div className="movie-list">
          {actors.map((actor) => (
            <ActorCard key={actor.movie_person_id} actor={actor} />
          ))}
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}

      <p></p>
      <h1>Producer</h1>
      {producers ? (
        <div className="movie-list">
          {producers.map((producer) => (
            <ProducerCard key={producer.movie_person_id} producer={producer} />
          ))}
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default MovieDetails;
