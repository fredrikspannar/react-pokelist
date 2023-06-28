import { Routes, Route } from "react-router-dom";

import Start from "./pages/Start";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import About from "./pages/About";

function App() {

  return (
      <Routes>
        <Route path="/" element={ <Start/> } />
        <Route path="/favorites" element={ <Favorites/> } />
        <Route path="/settings" element={ <Settings/> } />
        <Route path="/about" element={ <About/> } />
      </Routes>
  )
}

export default App
