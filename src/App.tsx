import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import Search from "./assets/pages/Search";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
