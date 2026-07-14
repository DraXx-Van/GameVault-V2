import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import GameDetails from "./pages/GameDetails"
import Discover from "./pages/Discover"
import Library from "./pages/Library"
import WishList from "./pages/WishList"
import VaultGameDetails from "./pages/VaultGameDetails"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/vault/game/:id" element={<VaultGameDetails />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/library" element={<Library />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
