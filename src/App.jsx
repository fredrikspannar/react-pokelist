import { Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Start from "./pages/Start";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import About from "./pages/About";
import ShowPokemon from "./pages/ShowPokemon";

function App() {

  return (
      <Routes>
        <Route path="*" element={ <NotFound /> } />
        <Route path="/" element={ <Start/> } />
        <Route path="/favorites" element={ <Favorites/> } />
        <Route path="/settings" element={ <Settings/> } />
        <Route path="/about" element={ <About/> } />
        <Route path="/pokemon/:id/:name" element={ <ShowPokemon/> } />
      </Routes>
  )
}

export default App
