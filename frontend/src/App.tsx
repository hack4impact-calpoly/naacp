import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/LoginPage/LoginPage";
import Signup from "./components/SignupPage/SignupPage";
//import Navigation from "./navigation";
import NavBar from "./components/NavBar/NavBar";
import GardenCard from "./components/GardenCard/GardenCard";
import SearchPage from "./components/SearchPage/SearchPage";
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
              <Route path="/garden" element={<GardenCard />} />
              <Route path="/search" element={<SearchPage items={[]} />} />
            </Routes>
          </ul>
        </nav>
      </div>
    </Router>
  );
}
