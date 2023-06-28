import { Routes, Route } from "react-router-dom";

import Start from "./pages/Start";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";

function App() {

  return (
      <Routes>
        <Route path="/" element={ <Start/> } />
        <Route path="/favorites" element={ <Favorites/> } />
        <Route path="/settings" element={ <Settings/> } />
      </Routes>
  )
}

export default App
