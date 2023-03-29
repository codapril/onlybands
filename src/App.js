import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Explore from "./components/Explore";
import Home from "./components/Home";
import BandPage from "./components/BandPage";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="bands/:id" element={<BandPage /> }  />
        </Routes>
      </BrowserRouter>
    </div>
  )
  
}

export default App;
