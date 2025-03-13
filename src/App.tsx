import { Routes, Route, Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './App.css'

const loadHome = () => import('./views/Home')
const loadImageView = () => import('./views/ImageView')
const loadFavorites = () => import('./views/Favorites')
const loadBreeds = () => import('./views/Breeds')
const loadBreedDetail = () => import('./views/BreedDetail')

const Home = lazy(loadHome)
const ImageView = lazy(loadImageView)
const Favorites = lazy(loadFavorites)
const Breeds = lazy(loadBreeds)
const BreedDetail = lazy(loadBreedDetail)

function App() {
  return (
    <div>
      <nav>
        <Link to="/" onMouseEnter={() => void loadHome()}>
          Home
        </Link>
        <span className='px-1'>|</span>
        <Link to="/breeds" onMouseEnter={() => void loadBreeds()}>
          Breeds
        </Link>
        <span className='px-1'>|</span>
        <Link to="/favorites" onMouseEnter={() => void loadFavorites()}>
          Favorites
        </Link>
      </nav>
      
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image/:imageId" element={<ImageView />} />
          <Route path="/breeds" element={<Breeds />} />
          <Route path="/breed-detail/:breedId" element={<BreedDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
