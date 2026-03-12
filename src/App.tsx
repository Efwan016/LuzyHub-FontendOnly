import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Authenticated from "./assets/layout/Autenticated";

const Home = React.lazy(() => import("./assets/pages/Home"));
const Search = React.lazy(() => import("./assets/pages/Search"));
const MovieDetail = React.lazy(() => import("./assets/pages/MovieDetail"));
const Category = React.lazy(() => import("./assets/pages/Category"));
const LiveFootball = React.lazy(() => import("./assets/pages/LiveFootball"));
const MatchDetail = React.lazy(() => import("./assets/services/MatchDetail"));

// Simple loading component to show while pages are loading.
const Loading = () => (
  <Authenticated>
    <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 200px)' }}>
      <div className="text-white text-xl">Loading...</div>
    </div>
  </Authenticated>
);

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:slug" element={<MovieDetail />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/sports/live" element={<LiveFootball />} />
          <Route path="/sports/match/:id" element={<MatchDetail />} />
        </Routes>
      </Suspense>
      <Analytics />
    </>
  );
}

export default App;
