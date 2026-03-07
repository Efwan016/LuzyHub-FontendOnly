import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Home from "./assets/pages/Home";
import Search from "./assets/pages/Search";
import MovieDetail from "./assets/pages/MovieDetail";
import Category from "./assets/pages/Category";
import LiveFootball from "./assets/pages/LiveFootball";




function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:slug" element={<MovieDetail />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/sports/live" element={<LiveFootball />} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
