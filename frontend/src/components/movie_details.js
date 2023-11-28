import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import ActorCard from "./actors";
import ProducerCard from "./producers";
import { useNavigate } from "react-router-dom";
import "../Styling/movie_details.css";

const MovieDetails = () => {
  console.log();
  const navigate = useNavigate();
  const { movieId } = useParams();
  console.log(movieId);
  const [movieDetails, setMovieDetails] = useState(null);
  const [actors, setActors] = useState(null);
  const [producers, setProducers] = useState(null);
  const [genre, setGenre] = useState(null);
  const [lang, setLang] = useState(null);
  const handleBack = () => {
    navigate(`/user`);
  };
  // console.log(movieId, movieID);
  useEffect(() => {
    Axios.get(`http://localhost:8080/movie/${movieId}`)
      .then((response) => setMovieDetails(response.data))
      .catch((error) => console.error(error));
  }, [movieId]);

  useEffect(() => {
    Axios.get(`http://localhost:8080/movie/lang/${movieId}`)
      .then((response) => {
        setLang(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, [movieId]);

  useEffect(() => {
    Axios.get(`http://localhost:8080/movie/actors/${movieId}`)
      .then((response) => setActors(response.data))
      .catch((error) => console.error(error));
  }, [movieId]);

  useEffect(() => {
    Axios.get(`http://localhost:8080/movie/producer/${movieId}`)
      .then((response) => setProducers(response.data))
      .catch((error) => console.error(error));
  }, [movieId]);

  useEffect(() => {
    Axios.get(`http://localhost:8080/movie/genre/${movieId}`)
      .then((response) => setGenre(response.data))
      .catch((error) => console.error(error));
  }, [movieId]);
  console.log(actors);
  console.log(producers);
  console.log(genre);

  return (
    <div className="movie-details-container">
      {movieDetails ? (
        <div className="movie-info-section">
          <div className="movie-header">
            <h1 style={{ fontSize: "70px" }} className="movie-title">
              {movieDetails.title}
            </h1>
            <img
              onClick={handleBack}
              src="https://www.svgrepo.com/show/495032/back-square.svg"
              alt="Back"
              className="back-icon"
            />
          </div>
          <p className="movie-description">{movieDetails.description}</p>
          <h3 className="movie-director">Director: {movieDetails.director}</h3>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}

      <div className="movie-languages">
        <h1>Languages:</h1>
        {lang ? (
          <div className="language-list">
            {lang.map((l) => (
              <div className="language-bubble" key={l.lang_name}>
                {" "}
                {l.lang_name}
              </div>
            ))}
          </div>
        ) : (
          <p>Loading languages...</p>
        )}
      </div>

      <div className="movie-genres">
        <h1>Genre:</h1>
        {genre ? (
          <div className="genre-list">
            {genre.map((gen) => (
              <div className="genre-bubble" key={gen.genre_name}>
                {gen.genre_name}
              </div>
            ))}
          </div>
        ) : (
          <p>Loading genres...</p>
        )}
      </div>

      <div className="movie-cast">
        <h1>Cast:</h1>
        {actors ? (
          <div className="actor-list">
            {actors.map((actor) => (
              <ActorCard key={actor.movie_person_id} actor={actor} />
            ))}
          </div>
        ) : (
          <p>Loading cast...</p>
        )}
      </div>

      <div className="movie-producers">
        <h1>Producer:</h1>
        {producers ? (
          <div className="producer-list">
            {producers.map((producer) => (
              <ProducerCard
                key={producer.movie_person_id}
                producer={producer}
              />
            ))}
          </div>
        ) : (
          <p>Loading producers...</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
