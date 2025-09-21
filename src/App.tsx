import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import "./App.css";

const loadHome = () => import("./views/Home");
const loadImageView = () => import("./views/ImageView"); // This will be CatModal
const loadFavorites = () => import("./views/Favorites");
const loadBreeds = () => import("./views/Breeds");
const loadBreedDetail = () => import("./views/BreedDetail"); // This will be BreedModal

const Home = lazy(loadHome);
const CatModal = lazy(loadImageView); // Renamed ImageView to CatModal for clarity
const Favorites = lazy(loadFavorites);
const Breeds = lazy(loadBreeds);
const BreedModal = lazy(loadBreedDetail); // Renamed BreedDetail to BreedModal for clarity

const App: React.FC = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | undefined;

  return (
    <div>
      <nav>
        <Link to="/" onMouseEnter={() => void loadHome()}>
          Home
        </Link>
        <span className="px-1">|</span>
        <Link to="/breeds" onMouseEnter={() => void loadBreeds()}>
          Breeds
        </Link>
        <span className="px-1">|</span>
        <Link to="/favorites" onMouseEnter={() => void loadFavorites()}>
          Favorites
        </Link>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        {/* Render main UI and modal routes */}
        <Routes location={state?.backgroundLocation ?? location}>
          <Route path="/" element={<Home />} />
          <Route path="/breeds" element={<Breeds />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/image/:id" element={<CatModal />} />
          <Route path="/breed/:id" element={<BreedModal />} />
          {/* Add other non-modal routes here */}
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
