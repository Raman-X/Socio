import React from "react";
import HomePage from "./scenes/homePage/index.jsx";
import ProfilePage from "./scenes/profilePage/index.jsx";
import LoginPage from "./scenes/loginPage/index.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
