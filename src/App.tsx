import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Components/HomePage/Home'
import Asteroid from './Components/Asteroid/Asteroid'

export default function App() {
  return (
    <div className="App">
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/asteroid" element={<Asteroid/>} />
  </Routes>
    </div>
  )
}






