import { Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import ImageView from './views/ImageView' // added ImageView import
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image/:imageId" element={<ImageView />} /> // updated route with parameter
      </Routes>
    </div>
  )
}

export default App
