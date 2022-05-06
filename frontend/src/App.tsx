import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/LoginPage/LoginPage";
import Signup from "./components/SignupPage/SignupPage";
//import Navigation from "./navigation";
import NavBar from "./components/NavBar/NavBar";
//import GardenCard from "./components/GardenCard/GardenCard";
import "./App.css";
import { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

Auth.configure(awsconfig);

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="/nav" element={<NavBar />} />
            </Routes>
          </ul>
        </nav>
      </div>
    </Router>
  );
}
