import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Peminatan from "./pages/Peminatan";
import LabDetail from "./pages/LabDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* 2. Route Dinamis: :id akan berubah sesuai yang diklik di dropdown */}
          <Route path="/peminatan" element={<Peminatan />} />
          <Route path="/peminatan/:id" element={<LabDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
