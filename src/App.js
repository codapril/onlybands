import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Explore from "./components/Explore";
import Home from "./components/Home";
import BandPage from "./components/BandPage";
import Profile from "./components/Profile";
import Settings from "./components/Settings"


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="bands/:id" element={<BandPage /> }  />
        </Routes>
      </BrowserRouter>
    </div>
  )
  
}

export default App;
