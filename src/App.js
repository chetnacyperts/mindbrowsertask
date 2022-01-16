import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Userdetail from "./Pages/Userdetail";
import Favorites from "./Pages/Favorites";

function App() {
  return (
    <Router>
      <div className="container contTop">
        <nav>
          <Link to="/">
            <button type="button" className="btn btn-primary">All Users</button>
          </Link>
          <Link to="/Favorites"> <button type="button" className="btn btn-primary">Favorites</button> </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Favorites" element={<Favorites />} />
          <Route path="/Userdetail/:id" element={<Userdetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
