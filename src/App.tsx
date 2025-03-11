import { Routes, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import ImageView from './views/ImageView' // added ImageView import
import './App.css'
import Favorites from './views/Favorites'
import Breeds from './views/Breeds'
import BreedDetail from './views/BreedDetail'

function App() {
  return (
    <div>
      <nav>
        <Link to="/">
          Home
        </Link>
        <span className='px-1'>|</span>
        <Link to="/breeds">
          Breeds
        </Link>
        <span className='px-1'>|</span>
        <Link to="/favorites">
          Favorites
        </Link>
      </nav>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image/:imageId" element={<ImageView />} />
        <Route path="/breeds" element={<Breeds />} />
        <Route path="/breed-detail/:breedId" element={<BreedDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  )
}

export default App
