import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Explore from "./components/Explore";
import Home from "./components/Home";
import BandPage from "./components/BandPage";
import Profile from "./components/Profile";
import Settings from "./components/Settings"
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  
  const [bands, setBands] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/bands`);
      const data = await response.json();
      console.log(data)
      setBands(data);
    }
 
    fetchData();

  }, []);

  return ( // "exact route" for nested
    <div className="App">
      <Layout></Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="explore" element={<Explore bands={bands}/>} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="login" element={<Login/> } />
          <Route path="register" element={<Register/> } />
          <Route path="settings" element={<Settings />} />
          <Route path="bands/:id" element={<BandPage bands={bands} />} />
        </Routes>
      </BrowserRouter>
      

    </div>
  )
  
}

export default App;
