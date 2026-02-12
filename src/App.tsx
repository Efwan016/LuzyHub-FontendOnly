import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/Home";
import Search from "./assets/pages/Search";
import MovieDetail from "./assets/pages/MovieDetail";
import Category from "./assets/pages/Category";




function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movie/:slug" element={<MovieDetail />} />
      <Route path="/category/:slug" element={<Category />} />
    </Routes>
  );
}

export default App;
