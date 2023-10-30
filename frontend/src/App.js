import './App.css';
import Register from './components/register'
import Login from './components/login'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;
