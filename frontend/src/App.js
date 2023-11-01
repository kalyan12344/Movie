import './App.css';
import Register from './components/register'
import Login from './components/login'
import Location from './components/location';
import Theater  from './components/theater';
import Showtime from './components/showtime';
import Movie from './components/movies';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/admin/location" element={<Location />} />
          <Route path="/admin/theater" element={<Theater />} />
          <Route path="/admin/showtime" element={<Showtime />} />
          <Route path="/admin/movies" element={<Movie />} />
      </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;
