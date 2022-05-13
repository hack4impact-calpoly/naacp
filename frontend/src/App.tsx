import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/Home/Home";
import Login from "./components/LoginPage/LoginPage";
import Signup from "./components/SignupPage/SignupPage";
import ConfirmSignUp from "./components/ConfirmSignUpPage/ConfirmSignUpPage";
//import Navigation from "./navigation";
//import NavBar from "./components/NavBar/NavBar";
//import Footer from "./components/Footer/Footer";
// import GardenCard from "./components/GardenCard/GardenCard";
import SearchPage from "./components/SearchPage/SearchPage";
import Home from "./components/Home/Home";
import GardenPage from "./components/GardenPage/GardenPage";
import "./App.css";
import { Auth } from "aws-amplify";

const awsmobile = {
  aws_project_region: "us-west-2",
  aws_cognito_identity_pool_id:
    "us-west-2:7d812fda-4620-431f-bf0f-769f0a2f8272",
  aws_cognito_region: "us-west-2",
  aws_user_pools_id: "us-west-2_dj6fZhBti",
  aws_user_pools_web_client_id: "5aphvj67gi3p9ehiq94lvqcib4",
  oauth: {},
  aws_cognito_username_attributes: ["EMAIL"],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ["EMAIL"],
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 6,
    passwordPolicyCharacters: [
      "REQUIRES_LOWERCASE",
      "REQUIRES_NUMBERS",
      "REQUIRES_UPPERCASE",
    ],
  },
  aws_cognito_verification_mechanisms: ["EMAIL"],
};

Auth.configure(awsmobile);

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <Home />
                  </div>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="signup/confirm" element={<ConfirmSignUp />} />
              <Route path="/garden" element={<GardenPage />} />
              <Route path="search" element={<SearchPage />} />
            </Routes>
          </ul>
        </nav>
      </div>
    </Router>
  );
}
