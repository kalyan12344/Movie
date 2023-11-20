import "./App.css";
import Register from "./components/register";
import Login from "./components/login";
import Location from "./components/location";
import Theater from "./components/theater";
import Showtime from "./components/showtime";
import Movie from "./components/movies";
import AddMovie from "./components/add_movies";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieList from "./components/view_movies";
import AdminDashboard from "./components/admin_dash";
import LocationList from "./components/view_locations";
import AddLocation from "./components/add_location";
import UserDashboard from "./components/user_dash";
import MovieDetails from "./components/movie_details";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/location" element={<Location />} />
          <Route path="/admin/theater" element={<Theater />} />
          <Route path="/admin/showtime" element={<Showtime />} />
          <Route path="/admin/movies" element={<Movie />} />
          <Route path="/admin/AddMovie" element={<AddMovie />} />
          <Route path="/admin/MovieList" element={<MovieList />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/addLocation" element={<AddLocation />} />
          <Route path="/admin/viewLocations" element={<LocationList />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route
            path="/user/movieDetails/:movieId"
            element={<MovieDetails />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
