import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Peminatan from "./pages/Peminatan";
import LabDetail from "./pages/LabDetail";
import HomeGame from "../src/pages/HomeGame";
import Map from "../src/components/Map";
import GameDetail from "../src/pages/GameDetail";

function App() {
  const [navbarVisible, setNavbarVisible] = useState(true);

  return (
    <Router>
      <Navbar forceShow={navbarVisible} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* 2. Route Dinamis: :id akan berubah sesuai yang diklik di dropdown */}
          <Route path="/peminatan" element={<Peminatan />} />
          <Route path="/peminatan/:id" element={<LabDetail />} />
          <Route
            path="/Home-Game"
            element={
              <HomeGame
                navbarVisible={navbarVisible}
                setNavbarVisible={setNavbarVisible}
              />
            }
          />
          <Route
            path="/Map"
            element={<Map setNavbarVisible={setNavbarVisible} />}
          />
          <Route
            path="/GameDetail"
            element={<GameDetail setNavbarVisible={setNavbarVisible} />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
