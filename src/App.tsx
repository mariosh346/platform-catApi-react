import { Routes, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import ImageView from './views/ImageView' // added ImageView import
import './App.css'
import Favorites from './views/Favorites'

function App() {
  return (
    <div>
      <nav>
        <Link to="/">
        Home</Link>
        <span className='px-1'>|</span>
        <Link to="/favorites">
        Favorites</Link>
      </nav>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image/:imageId" element={<ImageView />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  )
}

export default App
