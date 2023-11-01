import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Showtime = () => {
    const [show_name, setShowName] = useState("");
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("");
    const [available_seats, setAvailableSeats] = useState(0);
    const [theater_id, setTheaterId] = useState(0);
    const [movie_id, setMovieId] = useState(0);
    const [admin_id, setAdminId] = useState(1); 
    const [TheaterList, setTheaterList] = useState([{ 'theater_id': '', 'theater_name': '' }])
    const [MovieList, setMovieList] = useState([{ 'movie_id': '', 'title': '' }])

    const url = "http://localhost:8080/showtime"
    const theater_url = "http://localhost:8080/theater"
    const movie_url="http://localhost:8080/movie"

    useEffect(() => {
        Axios.get(`${theater_url}/get`).then(response => {
            setTheaterList(response.data);
            console.log(response.data)
        });
        Axios.get(`${movie_url}/get`).then(response => {
            setMovieList(response.data);
            console.log(response.data)
        });
    }, [])
    const ShowtimeSubmit = (e) => {
        e.preventDefault()
        const showtime = {
            show_name: show_name,
            start_time: start_time,
            end_time: end_time,
            available_seats: available_seats,
            theater_id: theater_id,
            movie_id: movie_id,
            admin_id: admin_id,
        };
        console.log("request body is here",showtime)
        Axios.post(`${url}/create`,showtime).then(response => {
            console.log(response)
        });


    }

    return (
        <>
            <form onSubmit={ShowtimeSubmit}>
            <div className='mb-3'>
                    <label htmlFor="show_name" className="form-label">Show Name</label>
                    <input type="text" className="form-control" onChange={e => setShowName(e.target.value)} placeholder='Enter Show Name' id="show_name" name="show_name" required/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="start_time" className="form-label">Start Time</label>
                    <input type="time" className="form-control" onChange={e => setStartTime(e.target.value)} id="start_time" name="start_time" />
                </div>
                <div className='mb-3'>
                    <label htmlFor="end_time" className="form-label">End Time</label>
                    <input type="time" className="form-control" onChange={e => setEndTime(e.target.value)} id="end_time" name="end_time" />
                </div>
                <div className='mb-3'>
                    <label htmlFor="available_seats" className="form-label">Available Seats</label>
                    <input type="number" className="form-control" onChange={e => setAvailableSeats(e.target.value)} id="available_seats" name="available_seats" />
                </div>
                <div className='mb-3'>
                <label htmlFor="theater_id" className="form-label">Theater</label>
                    <select className="form-control" value={theater_id} onChange={e => {setTheaterId(e.target.value)}}>
                        <option value="">Choose Theater</option>

                        {TheaterList.map(Theater => (
                            <option value={Theater.theater_id} key={Theater.theater_id} >{Theater.theater_name}</option>))}
                    </select>
                </div>
                <div className='mb-3'>
                <label htmlFor="movie_id" className="form-label">Movie</label>
                    <select className="form-control" value={movie_id} onChange={e => {setMovieId(e.target.value)}}>
                        <option value="" required>Choose Movie </option>

                        {MovieList.map(Movie => (
                            <option value={Movie.movie_id} key={Movie.movie_id} >{Movie.title}</option>))}
                    </select>
                </div>

                <button type='submit' className="btn btn-primary">Add Showtime</button>
            </form>
        </>

    )
}

export default Showtime