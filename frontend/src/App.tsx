import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navigation from "./navigation";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </ul>
        </nav>
      </div>
    </Router>
  );
}
