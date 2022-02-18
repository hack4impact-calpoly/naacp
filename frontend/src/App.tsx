import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
//import Navigation from "./navigation";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/nav" element={<NavBar />} />
            </Routes>
          </ul>
        </nav>
      </div>
    </Router>
  );
}
