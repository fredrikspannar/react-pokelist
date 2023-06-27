import { useState } from 'react'
import { Routes, Route } from "react-router-dom"

import Start from "./pages/Start"
import Favorites from "./pages/Favorites"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <Start/> } />
        <Route path="/favorites" element={ <Favorites/> } />
      </Routes>
    </>
  )
}

export default App
